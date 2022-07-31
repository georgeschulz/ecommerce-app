let pricingData = {
    setup: 0,
    billing: 0,
    size: 0
};

const {rows} = db.query(queries.getUserById, [customer_id]).then();
pricingData.billing = rows[0].square_feet;
console.log(pricingData.billing)

//get the details of the service so that we can calculate the price
db.query(queries.getServiceById, [service_id], (err, results) => {
    if(err) throw err;
    //extract service parameters from query
    const { base_price, setup_fee, price_per_square_foot, tier_multiplier } = results.rows;
    //calculate price
    let sizePrice = Number(price_per_square_foot) * pricingData.size;
    let totalBase = Number(base_price) + sizePrice;
    pricingData.billing = Math.pow(Number(tier_multiplier), 2) + totalBase

    pricingData.setup = Number(setup_fee);
    res.send(pricingData);
})