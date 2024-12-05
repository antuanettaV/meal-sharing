import express from 'express';
import knex from '../database_client.js';

const mealsRouter = express.Router();

mealsRouter.get('/', async (req, res) => {
  try {
    const meals = await knex('meal').select('id', 'title', 'description', 'price', 'image_url', 'location', 'max_reservations');
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Failed to load meals" });
  }
});

mealsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await knex('meal').where('id', id).first();
    if (!meal) {
      return res.status(404).json({ error: `Meal with ID ${id} not found.` });
    }
    res.json(meal);
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    res.status(500).json({ error: "Failed to load meal" });
  }
});

export default mealsRouter;
