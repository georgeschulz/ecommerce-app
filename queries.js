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

const getServiceByTargetPest = `
    SELECT DISTINCT
        MIN(services.service_id) AS service_id,
    MIN(services.service_name) AS service_name,
    MIN(services.price_per_square_foot) AS price_per_square_foot,
    MIN(services.billing_type) AS billing_type,
    MIN(services.tier_multiplier) AS tier_multiplier,
    MIN(services.services_per_year) AS services_per_year,
    MIN(services.base_price) AS base_price,
    MIN(services.setup_fee) AS setup_fee,
    MAX(pests.tier) AS pests_tier
    FROM services
    INNER JOIN services_pests 
            ON services.service_id = services_pests.service_id
    INNER JOIN pests
            ON services_pests.pest_name = pests.pest_name
    WHERE pests.pest_name = 'Spiders' OR pests.pest_name = 'Rodents'
    GROUP BY services.service_name;
`;

const getServiceByTargetPestAndServicePart1 = `
    SELECT DISTINCT
        MIN(services.service_id) AS service_id,
        MIN(services.service_name) AS service_name,
        MIN(services.price_per_square_foot) AS price_per_square_foot,
        MIN(services.billing_type) AS billing_type,
        MIN(services.tier_multiplier) AS tier_multiplier,
        MIN(services.services_per_year) AS services_per_year,
        MIN(services.base_price) AS base_price,
        MIN(services.setup_fee) AS setup_fee,
        MAX(pests.tier) AS pests_tier
    FROM services
    INNER JOIN services_pests 
            ON services.service_id = services_pests.service_id
    INNER JOIN pests
            ON services_pests.pest_name = pests.pest_name
    WHERE (`;

const getServiceByTargetPestAndServicePart2 = `
    ) AND services.service_id = $1
    GROUP BY services.service_name;
`

const addServiceToCart = `
    INSERT INTO cart (customer_id, service_id, price)
    VALUES ($1, $2, $3);
`;

const getSquareFeet = `SELECT square_feet FROM customers WHERE customer_id = $1`;

const getUserCart = `
    SELECT
        cart.cart_id,
        cart.customer_id, 
        cart.service_id,
        services.service_name,
        services.billing_type,
        services.services_per_year,
        cart.price
    FROM cart
    INNER JOIN services
        ON cart.service_id = services.service_id
    WHERE customer_id = $1;
`

const deleteCartItem = `
    DELETE FROM cart WHERE cart_id = $1;
`

const clearCart = `
    DELETE FROM cart WHERE customer_id = $1;
`

const createOrder = `
    INSERT INTO orders (service_id, date_created, customer_id, complete, date_scheduled, price, address, city, state, zip, first_name, last_name) VALUES
    ($1, $2, 4, false, $3, $4, $5, $6, $7, $8, $9, $10);
`

const getAllOrders = `SELECT * FROM orders`;

const getOrderById = `SELECT * FROM orders WHERE order_id = $1`;

module.exports = {
    createCustomer,
    checkUserAuth,
    getUsers,
    getUserById,
    updateUserByIdPart1,
    updateUserByIdPart2,
    selectAllServices,
    getServiceById,
    addServiceToCart,
    getSquareFeet,
    getServiceByTargetPestAndServicePart1,
    getServiceByTargetPestAndServicePart2,
    getUserCart,
    deleteCartItem,
    clearCart,
    createOrder,
    getAllOrders,
    getOrderById
}