const Pool = require('pg').Pool;
const pool = new Pool({
      user: process.env.DEV_USER,
      database: process.env.DEV_DB,
      password: process.env.DEV_PASSWORD,
      port: '5432',
      host: 'db'
});

module.exports = pool;
