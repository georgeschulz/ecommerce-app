const queries = require('../queries');
const db = require('../db');

const getUsers = (req, res) => {
    db.query(queries.getUsers, (err, results) => {
        if(err) throw(err);
        res.send(results.rows);
    })
}

const getUserById = (req, res) => {
    const id = req.params.id;
    db.query(queries.getUserById, [id], (err, results) => {
        if(err) throw(err);
        res.send(results.rows);
    })
}

const updateUserById = async (req, res, next) => {
    const id = req.params.id;
    const { first_name, last_name, address, city, state_abbreviation, zip, email, phone, square_feet} = req.body;

    const values = [];

    if(email) values.push(`email = '${email}'`)
    if(first_name) values.push(`first_name = '${first_name}'`);
    if(last_name) values.push(`last_name = '${last_name}'`)
    if(address) values.push(`address = '${address}'`);
    if(city) values.push(`city = '${city}'`);
    if(state_abbreviation) values.push(`state_abbreviation = '${state_abbreviation}'`)
    if(zip) values.push(`zip = '${zip}'`);

    if(phone) values.push(`phone = '${phone}'`);
    if(square_feet) values.push(`square_feet = '${square_feet}'`);

    const updateQuery = queries.updateUserByIdPart1 + values.join(', ') + queries.updateUserByIdPart2;
    
    db.query(updateQuery, [id], (err, results) => {
        if(err) {
            if(err.constraint == 'unique_email') {
                res.status(404).send('Email already exists')
            } else {
                throw err;
            }
        } else {
            res.send(`Resource succesfully updated.`);
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    updateUserById
}