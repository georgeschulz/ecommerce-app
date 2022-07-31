const queries = require('../queries');
const db = require('../db');

const getAllServices = (req, res) => {
    db.query(queries.selectAllServices, (err, results) => {
        if (err) throw err;
        res.send(results.rows);
    })
}

const getServiceById = (req, res) => {
    const id = req.params.id;
    db.query(queries.getServiceById, [id], (err, results) => {
        if(err) throw err;
        res.send(results.rows);
    });
}

module.exports = {
    getAllServices,
    getServiceById
}