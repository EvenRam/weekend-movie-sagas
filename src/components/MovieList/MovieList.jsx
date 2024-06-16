import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import './MovieList.css';

function MovieList() {

  const history = useHistory()

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

const handleDetails = (event) => {
 event.preventDefault()

history.push("/DetailsPage")

}

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <button>
              <img 
              data-testid="toDetails"
              src={movie.poster} 
              alt={movie.title}
              onClick={handleDetails}
              />
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
