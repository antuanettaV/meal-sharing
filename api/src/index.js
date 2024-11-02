import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import knex from "./database_client.js";
import cors from "cors";
import bodyParser from "body-parser";
import mealsRouter from "./routers/meals.js"; 
import reservationRouter from "./routers/reservation.js"; 
import reviewsRouter from "./routers/reviews.js"; 

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;"; 
  try {
    const tables = await knex.raw(SHOW_TABLES_QUERY);
    res.json({ tables });
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Failed to fetch tables" });
  }
});

apiRouter.use("/meals", mealsRouter); 
apiRouter.use("/reservations", reservationRouter); 
apiRouter.use("/reviews", reviewsRouter); 

app.use("/api", apiRouter);

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});

import 'dotenv/config';

console.log('DB_CLIENT:', process.env.DB_CLIENT);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);