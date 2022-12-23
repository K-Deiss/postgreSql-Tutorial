const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "ModularCX123",
  database: "Bobeli-Database",
  host: "localhost",
  port: 5432,
});
pool.connect();

module.exports = pool;
