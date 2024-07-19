import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';



const DetailsPage = () => {


    const dispatch = useDispatch()
    const movies = useSelector(store => store.movies);
    const movieGenres = useSelector(store => store.genres);

    const { id } = useParams();


    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES', payload: id });
    }, []);


    const movie = movies.find(movie => movie.id === Number(id));

    console.log('genres', movieGenres)
    console.log('movies', movies)



    return (
        <>

            <div data-testid="movieDetails">

                <h1> Movie Details:</h1>
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <img src={movie.poster} alt={movie.title} />
                <p> Genres: {movieGenres.map(genre => {
                    return (
                        <li key={genre.id}>
                            {genre.name}
                        </li>
                    )
                })}
                </p>

                <Link to='/' data-testid="toList">  Back to Movie List</Link>

            </div>
        </>
    )
}

export default DetailsPage