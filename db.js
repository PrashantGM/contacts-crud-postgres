const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'contacts_db',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
