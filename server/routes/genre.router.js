
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/', (req, res) => {
  const queryText = `
SELECT * FROM "genres"
`
  pool.query(queryText)
    .then((result) => {
      console.log("result in genres.get", result.rows);
      res.json(result.rows)
    })
    .catch((error) => {
      console.log('error in genres.get ');
      res.sendStatus(500)
    })
});
module.exports = router;
