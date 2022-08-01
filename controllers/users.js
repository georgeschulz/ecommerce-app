const queries = require('../queries');
const db = require('../db');

//get all of the users
const getUsers = (req, res) => {
    db.query(queries.getUsers, (err, results) => {
        if(err) throw(err);
        res.status(200).send(results.rows);
    })
}

//get a specific user by the customer_id
const getUserById = (req, res) => {
    const id = req.params.id;
    db.query(queries.getUserById, [id], (err, results) => {
        if(err) {
            res.status(404).send('Could not find user');
        } else if (results.rows.length <= 0) {
            res.status(404).send([]); //send an error when no customers are found for that ID
        } else {
            res.send(results.rows);
        }
    })
}

const updateUserById = async (req, res, next) => {
    const id = req.params.id; //extract the customer_id from the URL
    const { first_name, last_name, address, city, state_abbreviation, zip, email, phone, square_feet} = req.body; //get the parameters to update from the request

    const values = [];
    //Pattern that follows: if a new value was provided, push a formatted phrase for the update query. Check each possible value to change
    if(email) values.push(`email = '${email}'`)
    if(first_name) values.push(`first_name = '${first_name}'`);
    if(last_name) values.push(`last_name = '${last_name}'`)
    if(address) values.push(`address = '${address}'`);
    if(city) values.push(`city = '${city}'`);
    if(state_abbreviation) values.push(`state_abbreviation = '${state_abbreviation}'`)
    if(zip) values.push(`zip = '${zip}'`);
    if(phone) values.push(`phone = '${phone}'`);
    if(square_feet) values.push(`square_feet = '${square_feet}'`);

    //concatenate the query components together. In the middle join the values as comma seperated values to set those specific values
    const updateQuery = queries.updateUserByIdPart1 + values.join(', ') + queries.updateUserByIdPart2;
    
    db.query(updateQuery, [id], (err, results) => {
        if(err) {
            //this checks if a constraint, named unique_email that ensures that the email is unique on the postgres end has not been violated
            if(err.constraint == 'unique_email') {
                res.status(404).send('Email already exists')
            } else {
                res.status(404).send('Error updating the values')
            }
        } else {
            res.status(204).send(`Resource succesfully updated.`);
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    updateUserById
}