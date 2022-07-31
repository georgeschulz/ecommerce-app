const queries = require('../queries');
const db = require('../db');

//controller that adds a service to the cart
const addServiceToCart = (req, res) => {
    //extract parameters for api call from params (url) and request body
    const { customer_id, service_id } = req.params;
    const { target } = req.body;

    if (target.length <= 0) {
        //handle cases where the user forgets to add a body to their request
        res.status(404).send('Please include a body for your request with a property, target, containing a list of string names of pests')
    } else {
        //create the query from the body. The filters are added as OR clauses for pest name, then the query pulls out the highest tier that matches the filter
        const formattedPestFilter = target.map(pest => `pests.pest_name = '${pest}'`).join(' OR ');
        //concatenate the two templates in the queries.js file with the filter
        const serviceParameterQuery = queries.getServiceByTargetPestAndServicePart1 + formattedPestFilter + queries.getServiceByTargetPestAndServicePart2;
        //get the square feet of the customer's home from the customers table
        db.query(queries.getSquareFeet, [customer_id], (err, customerResult) => {
            if (err) { //general errors
                res.status(404).send('Error: ' + err)
            } else if (!customerResult.rows.length > 0) { //No results returned because there was no user with that ID
                res.status(404).send('Error: No customer exists with this ID.')
            } else { 
                const squareFeet = customerResult.rows[0].square_feet; //pull square feet from the resulting query
                //query the services table and find the matching tier and service level for user submitted info
                db.query(serviceParameterQuery, [service_id], (err, serviceResult) => {
                    if (err) {
                        res.status(404).send('Error: ' + err);
                    } else if (!serviceResult.rows.length > 0) { //no services returned because there was no match between the target pests and the service ID
                        res.status(404).send('Error: No service available for the submitted pest and service ID combination');
                    } else {
                        const service = serviceResult.rows[0]; //this is the success result of the serviceParameterQuery
                        //pull the parameters from the serviceResult we need to calculate price
                        const serviceName = service.service_name;
                        const pricePerSquareFeet = Number(service.price_per_square_foot);
                        const setup = Number(service.setup_fee);
                        const base = Number(service.base_price);
                        const multiplier = Number(service.tier_multiplier);
                        const tier = Number(service.pests_tier);
                        //arithmetic to calculate price
                        const sizeCost = base + (pricePerSquareFeet * squareFeet);
                        const price = Math.round((Math.pow(multiplier, (tier - 1)) * sizeCost) * 100) / 100;
                        //add the service to the customer's cart 
                        db.query(queries.addServiceToCart, [customer_id, service_id, price], (err, result) => {
                            if (err) {
                                res.status(404).send('Error adding the service to the cart')
                            } else {
                                res.status(200).send({ msg: `${serviceName} added to the cart of customer ${customer_id}`, data: { serviceName, customer_id, service_id, pricePerSquareFeet, setup, base, multiplier, tier, price } })
                            }
                        })
                    }
                })
            }
        })
    }
}

module.exports = {
    addServiceToCart
}