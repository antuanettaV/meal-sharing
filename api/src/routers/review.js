import express from "express";
import knex from "../database_client.js";

const reviewsRouter = express.Router();

function validateReviewFields({ title, description, meal_id, stars }) {
  if (!title || !description || !meal_id || !stars) {
    return {
      valid: false,
      error: "Fields title, description, meal_id, and stars are required.",
    };
  }

  if (stars < 1 || stars > 5) {
    return {
      valid: false,
      error: "Stars must be between 1 and 5.",
    };
  }

  return { valid: true };
}

reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await knex("review").select("*");
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error.message || error);
    res.status(500).json({ error: "An error occurred while retrieving reviews." });
  }
});

reviewsRouter.post("/", async (req, res) => {
  const { title, description, meal_id, stars } = req.body;

  const validation = validateReviewFields({ title, description, meal_id, stars });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    console.log("Inserting review with data:", { title, description, meal_id, stars });

    const [id] = await knex("review").insert({
      meal_id,
      title,
      description,
      stars,
      created_date: knex.fn.now(),
    });
    res.status(201).json({ id, message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error.message || error);
    res.status(500).json({ error: "An error occurred while adding the review." });
  }
});

reviewsRouter.get("/meals/:meal_id", async (req, res) => {
  const { meal_id } = req.params;
  try {
    const reviews = await knex("review").where({ meal_id });
    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this meal." });
    }
    res.json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews for meal:", error.message || error);
    res.status(500).json({ error: "An error occurred while retrieving reviews." });
  }
});

reviewsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await knex("review").where({ id }).first();
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.json(review);
  } catch (error) {
    console.error("Error retrieving review:", error.message || error);
    res.status(500).json({ error: "An error occurred while retrieving the review." });
  }
});

reviewsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, meal_id, stars } = req.body;

  const validation = validateReviewFields({ title, description, meal_id, stars });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const updatedRows = await knex("review").where({ id }).update({
      title,
      description,
      meal_id,
      stars,
      created_date: knex.fn.now(),
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Review not found." });
    }

    res.json({ message: "Review updated successfully." });
  } catch (error) {
    console.error("Error updating review:", error.message || error);
    res.status(500).json({ error: "An error occurred while updating the review." });
  }
});

reviewsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await knex("review").where({ id }).del();
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Review not found." });
    }

    res.json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error.message || error);
    res.status(500).json({ error: "An error occurred while deleting the review." });
  }
});

export default reviewsRouter;
