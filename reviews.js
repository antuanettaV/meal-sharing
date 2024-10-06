const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', async (req, res) => {
    try {
        const reviews = await knex('reviews');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving reviews.' });
    }
});

router.get('/meals/:meal_id/reviews', async (req, res) => {
    const { meal_id } = req.params;
    try {
        const reviews = await knex('reviews').where('meal_id', meal_id);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving reviews for this meal.' });
    }
});

router.post('/', async (req, res) => {
    const newReview = req.body;
    try {
        const [id] = await knex('reviews').insert(newReview);
        res.status(201).json({ id, ...newReview });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the review.' });
    }
});

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
