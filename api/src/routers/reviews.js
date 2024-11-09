import express from 'express';
import knex from '../database_client.js'; 

const reviewsRouter = express.Router(); 

reviewsRouter.get('/', async (req, res) => {
    try {
        const reviews = await knex('reviews');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving reviews.' });
    }
});

reviewsRouter.get('/meals/:meal_id/reviews', async (req, res) => {
    const { meal_id } = req.params;
    try {
        const reviews = await knex('reviews').where('meal_id', meal_id);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving reviews for this meal.' });
    }
});

reviewsRouter.post('/', async (req, res) => {
    const newReview = req.body;
    try {
        const [id] = await knex('reviews').insert(newReview);
        res.status(201).json({ id, ...newReview });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the review.' });
    }
});

reviewsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await knex('reviews').where('id', id).first();
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ error: 'Review not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the review.' });
    }
});

reviewsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedReview = req.body;
    try {
        const count = await knex('reviews').where('id', id).update(updatedReview);
        if (count) {
            res.json({ id, ...updatedReview });
        } else {
            res.status(404).json({ error: 'Review not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the review.' });
    }
});

reviewsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await knex('reviews').where('id', id).del();
        if (count) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: 'Review not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the review.' });
    }
});

export default reviewsRouter;
