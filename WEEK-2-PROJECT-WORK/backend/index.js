// 1. Initialize configurations
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import our database pool

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware
app.use(cors());
app.use(express.json()); // Allows our server to read JSON data

// 3. Health Check Endpoint (GET /api/health)
app.get('/api/health', async (req, res) => {
    try {
        // Execute an ultra-simple query to test if the DB is alive
        await pool.query('SELECT 1'); 
        
        // If successful, send 200 OK status
        return res.status(200).json({
            status: "ok",
            database: "connected"
        });
    } catch (error) {
        // If database goes down, catch the error and send a 500 Internal Server Error
        console.error("Database connection failed:", error.message);
        
        return res.status(500).json({
            status: "error",
            database: "disconnected",
            message: "Could not connect to the database"
        });
    }
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
