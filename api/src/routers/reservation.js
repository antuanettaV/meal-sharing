import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

reservationsRouter.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservation");
    res.json(reservations);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res
      .status(500)
      .json({ error: "Server error while retrieving reservations." });
  }
});

reservationsRouter.post("/", async (req, res) => {
  const {
    meal_id,
    number_of_guests,
    contact_name,
    contact_phonenumber,
    contact_email,
  } = req.body;

  if (!meal_id || !number_of_guests || !contact_name || !contact_phonenumber || !contact_email) {
    return res.status(400).json({
      error: "All fields are required: meal_id, number_of_guests, contact_name, contact_phonenumber, and contact_email.",
    });
  }

  try {
    const meal = await knex("meal").where("id", meal_id).first();
    if (!meal) {
      return res.status(404).json({ error: "Meal not found." });
    }

    const totalReservedResult = await knex("reservation")
      .where({ meal_id })
      .sum("number_of_guests as total");
    const totalReserved = totalReservedResult[0]?.total || 0;

    const availableSpots = meal.max_reservations - totalReserved;

    if (number_of_guests > availableSpots) {
      return res.status(400).json({
        error: `Not enough spots available. Only ${availableSpots} spots left.`,
      });
    }

    const newReservation = {
      meal_id,
      number_of_guests,
      contact_name,
      contact_phonenumber,
      contact_email,
      created_date: new Date(),
    };

    const result = await knex("reservation").insert(newReservation);

    res.status(201).json({
      message: "Reservation successfully created",
      id: result[0],
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "An error occurred while creating the reservation." });
  }
});

export default reservationsRouter;
