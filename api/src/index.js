import "dotenv/config";
import express from "express";
import cors from "cors";
import knex from "./database_client.js";
import mealsRouter from "./routers/meals.js";
import reservationRouter from "./routers/reservation.js";
import reviewsRouter from "./routers/review.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

app.use("/api/meals", mealsRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/reviews", reviewsRouter);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});

