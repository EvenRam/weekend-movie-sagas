
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/:id', (req, res) => {
  // add query to get all genres
  const movieId = req.params.id;
  console.log("router get for all generes")
  const queryText = `
SELECT genres.id, genres.name 
FROM genres
JOIN movies_genres.movie_id = ${movieId};
`;
  pool.query(queryText)
    .then((result) => {
      console.log("results", result.rows);
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('error in fetching details', error);
      res.sendStatus(500)
    })
});
module.exports = router;
