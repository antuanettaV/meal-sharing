require('dotenv').config();

const express = require('express'); 
const knex = require('knex')({
    client: 'mysql', 
    connection: {
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT,
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD, 
        database: process.env.DB_NAME 
    }
});

const app = express();
const port = 3000;

const sendJSON = (res, status, data) => {
    res.status(status).json(data);
};

app.get('/test-connection', async (req, res) => {
    try {
        const result = await knex.raw("SELECT 1 + 1 AS result");
        sendJSON(res, 200, { message: "Database connection is working!", result: result[0] });
    } catch (error) {
        console.error("Error testing database connection:", error);
        sendJSON(res, 500, { error: "Database connection failed." });
    }
});

app.get('/future-meals', async (req, res) => {
    try {
        const futureMeals = await knex.raw("SELECT * FROM meal WHERE `when` > NOW()");
        sendJSON(res, 200, futureMeals[0].length ? futureMeals[0] : []); 
    } catch (error) {
        console.error("Error retrieving future meals:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving future meals." });
    }
});

app.get('/past-meals', async (req, res) => {
    try {
        const pastMeals = await knex.raw("SELECT * FROM meal WHERE `when` < NOW()");
        sendJSON(res, 200, pastMeals[0].length ? pastMeals[0] : []); 
    } catch (error) {
        console.error("Error retrieving past meals:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving past meals." });
    }
});

app.get('/all-meals', async (req, res) => {
    try {
        const allMeals = await knex.raw("SELECT * FROM meal ORDER BY id ASC");
        sendJSON(res, 200, allMeals[0].length ? allMeals[0] : []); 
    } catch (error) {
        console.error("Error retrieving all meals:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving all meals." });
    }
});

app.get('/first-meal', async (req, res) => {
    try {
        const firstMeal = await knex.raw("SELECT * FROM meal ORDER BY id ASC LIMIT 1");
        if (firstMeal[0].length === 0) { 
            sendJSON(res, 404, { message: "No meals found." });
        } else {
            sendJSON(res, 200, firstMeal[0][0]); 
        }
    } catch (error) {
        console.error("Error retrieving first meal:", error);
        sendJSON(res, 500, { error: "An error occurred while fetching the first meal." });
    }
});

app.get('/last-meal', async (req, res) => {
    try {
        const lastMeal = await knex.raw("SELECT * FROM meal ORDER BY id DESC LIMIT 1");
        if (lastMeal[0].length === 0) { 
            sendJSON(res, 404, { message: "No meals found." });
        } else {
            sendJSON(res, 200, lastMeal[0][0]);
        }
    } catch (error) {
        console.error("Error retrieving last meal:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving the last meal." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
