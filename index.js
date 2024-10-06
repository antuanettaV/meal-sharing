require('dotenv').config();

const express = require('express'); 
const knex = require('./database'); 

const app = express();
const port = 3000;

app.use(express.json());

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
        const futureMeals = await knex('meal').where('when', '>', new Date());
        sendJSON(res, 200, futureMeals.length ? futureMeals : []); 
    } catch (error) {
        console.error("Error retrieving future meals:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving future meals." });
    }
});

app.get('/past-meals', async (req, res) => {
    try {
        const pastMeals = await knex('meal').where('when', '<', new Date());
        sendJSON(res, 200, pastMeals.length ? pastMeals : []); 
    } catch (error) {
        console.error("Error retrieving past meals:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving past meals." });
    }
});

app.get('/all-meals', async (req, res) => {
    try {
        const allMeals = await knex('meal').orderBy('id', 'asc');
        sendJSON(res, 200, allMeals.length ? allMeals : []); 
    } catch (error) {
        console.error("Error retrieving all meals:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving all meals." });
    }
});

app.get('/first-meal', async (req, res) => {
    try {
        const firstMeal = await knex('meal').orderBy('id', 'asc').first();
        if (!firstMeal) { 
            sendJSON(res, 404, { message: "No meals found." });
        } else {
            sendJSON(res, 200, firstMeal); 
        }
    } catch (error) {
        console.error("Error retrieving first meal:", error);
        sendJSON(res, 500, { error: "An error occurred while fetching the first meal." });
    }
});

app.get('/last-meal', async (req, res) => {
    try {
        const lastMeal = await knex('meal').orderBy('id', 'desc').first();
        if (!lastMeal) { 
            sendJSON(res, 404, { message: "No meals found." });
        } else {
            sendJSON(res, 200, lastMeal);
        }
    } catch (error) {
        console.error("Error retrieving last meal:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving the last meal." });
    }
});

app.get('/api/meals', async (req, res) => {
    const {
        maxPrice,
        availableReservations,
        title,
        dateAfter,
        dateBefore,
        limit,
        sortKey = 'when',
        sortDir = 'asc',
    } = req.query;

     let query = knex('meal');

        if (maxPrice) {
        query = query.where('price', '<', maxPrice);
    }

     if (availableReservations) {
        const isAvailable = availableReservations === 'true';
        query = query.where('max_reservations', isAvailable ? '>' : '=', knex.raw('(SELECT COUNT(*) FROM reservations WHERE meal_id = meal.id)'));
    }

       if (title) {
        query = query.where('title', 'like', `%${title}%`);
    }

       if (dateAfter) {
        query = query.where('date', '>', dateAfter);
    }

       if (dateBefore) {
        query = query.where('date', '<', dateBefore);
    }

        if (['when', 'max_reservations', 'price'].includes(sortKey)) {
        query = query.orderBy(sortKey, sortDir);
    }

        if (limit) {
        query = query.limit(limit);
    }

    try {
        const meals = await query;
        sendJSON(res, 200, meals);
    } catch (error) {
        console.error("Error retrieving meals:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving meals." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
