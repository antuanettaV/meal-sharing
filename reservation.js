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
        const reservations = await knex.select().from('reservation');
        res.status(200).json(reservations.length ? reservations : []);
    } catch (error) {
        console.error("Error retrieving reservations:", error);
        res.status(500).json({ error: "An error occurred while retrieving reservations." });
    }
});

router.post('/', async (req, res) => {
    const newReservation = req.body;
    try {
        const result = await knex('reservation').insert(newReservation);
        res.status(201).json({ message: 'Reservation created', id: result[0] });
    } catch (error) {
        console.error("Error adding reservation:", error);
        res.status(500).json({ error: "An error occurred while adding the reservation." });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await knex('reservation').where({ id }).first();
        if (!reservation) {
            res.status(404).json({ message: `Reservation with ID ${id} not found.` });
        } else {
            res.status(200).json(reservation);
        }
    } catch (error) {
        console.error("Error retrieving reservation by id:", error);
        res.status(500).json({ error: `An error occurred while retrieving reservation with ID ${id}.` });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedReservation = req.body;
    try {
        const result = await knex('reservation').where({ id }).update(updatedReservation);
        if (result === 0) {
            res.status(404).json({ message: `Reservation with ID ${id} not found.` });
        } else {
            res.status(200).json({ message: `Reservation with ID ${id} updated.` });
        }
    } catch (error) {
        console.error("Error updating reservation:", error);
        res.status(500).json({ error: `An error occurred while updating reservation with ID ${id}.` });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await knex('reservation').where({ id }).del();
        if (result === 0) {
            res.status(404).json({ message: `Reservation with ID ${id} not found.` });
        } else {
            res.status(200).json({ message: `Reservation with ID ${id} deleted.` });
        }
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ error: `An error occurred while deleting reservation with ID ${id}.` });
    }
});

module.exports = router;
