const createCustomer = `
    INSERT INTO customers (first_name, last_name, address, city, state_abbreviation, zip, email, phone, password, square_feet, date_created) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

const checkUserAuth = `SELECT * FROM customers WHERE email = $1`;

const getUsers = `SELECT * FROM customers`;

const getUserById = `SELECT * FROM customers WHERE customer_id = $1`;

const updateUserByIdPart1 = 'UPDATE customers SET ';
const updateUserByIdPart2 = ' WHERE customer_id = $1';

const selectAllServices = `SELECT * FROM services`;

const getServiceById = `SELECT * FROM services WHERE service_id = $1`;

module.exports = {
    createCustomer,
    checkUserAuth,
    getUsers,
    getUserById,
    updateUserByIdPart1,
    updateUserByIdPart2,
    selectAllServices,
    getServiceById
}