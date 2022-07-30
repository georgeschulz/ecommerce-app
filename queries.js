const createCustomer = `
    INSERT INTO customers (first_name, last_name, address, city, state_abbreviation, zip, email, phone, password, square_feet, date_created) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

const checkUserAuth = `SELECT * FROM customers WHERE email = $1`;

module.exports = {
    createCustomer,
    checkUserAuth
}