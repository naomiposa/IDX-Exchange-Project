const path = require('path');
const mysql = require('mysql2/promise'); // Using the promise version for async/await support
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load environment variables early

// Create the connection pool using our hidden .env variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
