const queries = require('../queries');
const db = require('../db');

const getAllOrders = (req, res) => {
    db.query(queries.getAllOrders, (err, results) => {
        if(err) {
            res.status(404).send('Error retrieving orders')
        } else {
            res.status(200).send(results.rows);
        }
    })
}

const getOrderById = (req, res) => {
    const { order_id } = req.params;
    db.query(queries.getOrderById, [order_id], (err, result) => {
        if(err) {
            res.status(404).send('Error finding orders')
        } else {
            res.status(200).send(result.rows[0]);
        }
    })
}

module.exports = {
    getAllOrders,
    getOrderById
};