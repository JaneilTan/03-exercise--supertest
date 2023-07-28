const Pool = require("pg").Pool;

const pool = new Pool({
  // See the .env file for these values
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  end: () => {
    pool.end();
  },
};
