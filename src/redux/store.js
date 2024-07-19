import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery ("NAV_TO_DETAILS_PAGE", handlesDetails)
  yield takeEvery('SET_GENRES' , fetchGenres);
  yield takeEvery ('SET_MOVIE_DETAILS', fetchMovieDetails)
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}


function* handlesDetails(action){
yield put ({
  type: "NAV_TO_DETAIL_PAGE",
  payload: action.payload
})

}
function* fetchMovieDetails(action) {
  try {
    const detailResponse = yield axios.get(`/api/movies`);
    yield put({
      type: 'SET_MOVIE_DETAILS',
      payload: detailResponse.data
    });
  } catch (error) {
    console.log('fetchMovieDetails error:', error);
  }
}

function* fetchGenres(action){
try{
  //Get all Genres
  const genreRepsonse = yield axios.get(`/api/genres/${action.payload}`);
  console.log('checking genre', genreRepsonse)
  yield put ({ 
    type: "SET_GENRES",
    payload:genreRepsonse.data
  });
}catch (error) {
  console.log('fetchAllGenres error:', error)
}
}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  console.log('movies', action.payload)

  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {  
  
  console.log("GENRES", action.payload)

  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

const movieDetails = (state = [], action) => {
switch (action.type){
  case 'SET_MOVIE_DETAILS':
    return action.payload;
    default:
      return state;
}
}

const movieGenres = (state = [], action) => {
  console.log("MovieGENRES", action.payload)
  switch (action.type){
    case 'SET_MOVIE_GENRES':
      return action.payload;
      default:
        return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
    movieGenres

  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
