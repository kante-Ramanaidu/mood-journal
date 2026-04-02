const { Pool } = require('pg');
require('dotenv').config();



const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // ← required for Supabase
});

pool.connect()
  .then(() => console.log("✅ Connected to Supabase PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err.message));

module.exports = pool;


//local connection (for development)
// const pool = new Pool({
//   user: process.env.DB_USER 
//   host: process.env.DB_HOST
//   database: process.env.DB_NAME 
//   password: process.env.DB_PASSWORD 
//   port: process.env.DB_PORT
// });

