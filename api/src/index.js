import "dotenv/config";
import express from 'express';
import knex from './database_client.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import mealsRouter from './routers/meals.js';
import reservationRouter from './routers/reservation.js';
import reviewsRouter from './routers/reviews.js';

const app = express();
const PORT = process.env.PORT || 3001;

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

app.get('/test-connection', async (req, res) => {
  try {
    const result = await knex.raw("SELECT 1 + 1 AS result");
    res.json({ message: "Database connection is working!", result: result[0] });
  } catch (error) {
    console.error("Error testing database connection:", error);
    res.status(500).json({ error: "Database connection failed." });
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
