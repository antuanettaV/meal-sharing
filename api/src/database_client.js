import knex from 'knex';

const connection = knex({
  client: process.env.DB_CLIENT || 'mysql2', 
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,  
    ssl: process.env.DB_USE_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
});

console.log('DB_CLIENT:', process.env.DB_CLIENT); 
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER); 
console.log('DB_NAME:', process.env.DB_NAME); 

export default connection;
