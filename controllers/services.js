const queries = require('../queries');
const db = require('../db');

const getAllServices = (req, res) => {
    db.query(queries.selectAllServices, (err, results) => {
        if (err) throw err;
        res.send(results.rows);
    })
}

module.exports = {
    getAllServices
}