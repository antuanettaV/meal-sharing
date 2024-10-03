const express = require('express');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
});
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const meals = await knex('meal').select('*');
        res.status(200).json(meals);
    } catch (error) {
        console.error("Error retrieving meals:", error);
        res.status(500).json({ error: "An error occurred while retrieving meals." });
    }
});

router.post('/', async (req, res) => {
    const newMeal = req.body;

      if (!newMeal.name || !newMeal.description || !newMeal.price) {
        return res.status(400).json({ error: "Meal name, description, and price are required." });
    }

    try {
        const result = await knex('meal').insert(newMeal);
        res.status(201).json({ message: 'Meal created', id: result[0] });
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
        console.error("Error retrieving meal by id:", error);
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
            res.status(200).json({ message: `Meal with ID ${id} updated.` });
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
            res.status(200).json({ message: `Meal with ID ${id} deleted.` });
        }
    } catch (error) {
        console.error("Error deleting meal:", error);
        res.status(500).json({ error: `An error occurred while deleting meal with ID ${id}.` });
    }
});

module.exports = router;
