// const pg= require('pg');
// const client = new pg.Client({
//     connectionString: 'postgresql://localhost:5432/ecommerce'
//   });
//   module.exports = client;
const { Pool } = require("pg");
const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "ecommerce"
  });
  pool.connect().then(() => {
          console.log('Connected to PostgreSQL!');
        }).catch((err) => {
          console.error('Error connecting to PostgreSQL:', err);
          pool.end();
        });    

module.exports=pool;