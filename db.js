const { Pool } = require('pg');

//create a new pool to be used for queriess
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASEPASSWORD,
    port: process.env.DATABASEPORT
});

//create the query method on the pool object
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
 
    }
}