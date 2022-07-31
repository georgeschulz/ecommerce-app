const queries = require('../queries');
const db = require('../db');

//controller to get all of the orders in the order table for admin purposes
const getAllOrders = (req, res) => {
    db.query(queries.getAllOrders, (err, results) => {
        if(err) {
            res.status(404).send('Error retrieving orders')
        } else {
            res.status(200).send(results.rows);
        }
    })
}

//controller to get an order by order_id in the orders table 
const getOrderById = (req, res) => {
    const { order_id } = req.params;
    db.query(queries.getOrderById, [order_id], (err, result) => {
        if(err) {
            res.status(404).send('Error finding orders')
        } else if (result.rows.length <= 0) {
            res.status(404).send('No orders found with this ID'); //this handles the error when no orders are found for the order_id
        } else {
            res.status(200).send(result.rows[0]);
        }
    })
}

module.exports = {
    getAllOrders,
    getOrderById
};