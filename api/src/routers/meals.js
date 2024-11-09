import express from 'express';
import knex from '../database_client.js';

const mealsRouter = express.Router();

mealsRouter.get('/', async (req, res) => {
  try {
    
    const meals = await knex('meal').select('*');
    res.json(meals); 
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Failed to load meals" });
  }
});

export default mealsRouter;
