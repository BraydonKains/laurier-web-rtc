const Pool = require('pg').Pool;
const pool = new Pool({
      user: process.env.USER,
      database: process.env.DB,
      password: process.env.PASSWORD,
      port: '5432',
      host: 'db'
});

module.exports = pool;
