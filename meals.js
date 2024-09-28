const express = require('express');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'my-secret-pw',
        database: 'test'
    }
});

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const meals = await knex.select().from('meal');
        res.status(200).json(meals.length ? meals : []);
    } catch (error) {
        console.error("Error retrieving meals:", error);
        res.status(500).json({ error: "An error occurred while retrieving meals." });
    }
});

router.post('/', async (req, res) => {
    const newMeal = req.body;
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
