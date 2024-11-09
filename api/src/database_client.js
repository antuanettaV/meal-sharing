import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

console.log("Database Configuration:");
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);

const connection = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_USE_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
  pool: { min: 0, max: 7 },
});

connection.raw("SELECT VERSION()")
  .then(() => {
    console.log(`Connection to DB successful!`);
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });

export default connection;
