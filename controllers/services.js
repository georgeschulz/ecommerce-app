const queries = require('../queries');
const db = require('../db');

//get all services as an array of objects, each object representing a service
const getAllServices = (req, res) => {
    db.query(queries.selectAllServices, (err, results) => {
        if (err) throw err;
        res.status(200).send(results.rows);
    })
}

//get a specific service by the service ID
const getServiceById = (req, res) => {
    const id = req.params.id;
    db.query(queries.getServiceById, [id], (err, results) => {
        if(err) throw err;
        res.status(200).send(results.rows);
    });
}

module.exports = {
    getAllServices,
    getServiceById
}