import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import knex from '../database_client.js'; 

const router = express.Router();

const sendJSON = (res, status, data) => {
    res.status(status).json(data);
};

router.get('/', async (req, res) => {
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
        query = query.where('when', '>', dateAfter);
    }

    if (dateBefore) {
        query = query.where('when', '<', dateBefore);
    }

    if (['when', 'max_reservations', 'price'].includes(sortKey)) {
        query = query.orderBy(sortKey, sortDir);
    }

    if (limit) {
        query = query.limit(limit);
    }

    try {
        const meals = await query;
        sendJSON(res, 200, meals.length ? meals : []);
    } catch (error) {
        console.error("Error retrieving meals:", error);
        sendJSON(res, 500, { error: "An error occurred while retrieving meals." });
    }
});

router.post('/', async (req, res) => {
    const newMeal = req.body;

    if (!newMeal.title || !newMeal.description || !newMeal.price) {
        return res.status(400).json({ error: "Meal title, description, and price are required." });
    }

    try {
        const result = await knex('meal').insert(newMeal);
        res.status(201).json({ message: 'Meal created successfully', id: result[0] });
    } catch (error) {
        console.error("Error adding meal:", error);
        res.status(500).json({ error: "An error occurred while adding the meal." });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const meal = await knex('meal').where({ id }).first();
        if (!meal) {
            res.status(404).json({ message: `Meal with ID ${id} not found.` });
        } else {
            res.status(200).json(meal);
        }
    } catch (error) {
        console.error("Error retrieving meal by ID:", error);
        res.status(500).json({ error: `An error occurred while retrieving meal with ID ${id}.` });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedMeal = req.body;

    try {
        const result = await knex('meal').where({ id }).update(updatedMeal);
        if (result === 0) {
            res.status(404).json({ message: `Meal with ID ${id} not found.` });
        } else {
            res.status(200).json({ message: `Meal with ID ${id} updated successfully.` });
        }
    } catch (error) {
        console.error("Error updating meal:", error);
        res.status(500).json({ error: `An error occurred while updating meal with ID ${id}.` });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await knex('meal').where({ id }).del();
        if (result === 0) {
            res.status(404).json({ message: `Meal with ID ${id} not found.` });
        } else {
            res.status(200).json({ message: `Meal with ID ${id} deleted successfully.` });
        }
    } catch (error) {
        console.error("Error deleting meal:", error);
        res.status(500).json({ error: `An error occurred while deleting meal with ID ${id}.` });
    }
});

export default router;
