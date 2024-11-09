import express from 'express';
import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'my-secret-pw',
        database: process.env.DB_NAME || 'test'
    }
});

const reservationRouter = express.Router();

reservationRouter.get('/', async (req, res) => {
    try {
        const reservations = await db.select().from('reservation');
        res.status(200).json(reservations.length ? reservations : []);
    } catch (error) {
        console.error("Error retrieving reservations:", error);
        res.status(500).json({ error: "An error occurred while retrieving reservations." });
    }
});

reservationRouter.post('/', async (req, res) => {
    const newReservation = req.body;
    try {
        const result = await db('reservation').insert(newReservation);
        res.status(201).json({ message: 'Reservation created', id: result[0] });
    } catch (error) {
        console.error("Error adding reservation:", error);
        res.status(500).json({ error: "An error occurred while adding the reservation." });
    }
});

reservationRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await db('reservation').where({ id }).first();
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

reservationRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedReservation = req.body;
    try {
        const result = await db('reservation').where({ id }).update(updatedReservation);
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

reservationRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db('reservation').where({ id }).del();
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

export default reservationRouter;
