import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { unstable_batchedUpdates } from "react-dom";


const DetailsPage = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const movies = useSelector(store => store.movies);
  

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);





    return(

        <>

    <h2> Movie Details:</h2>


        </>
    
    )
}

export default DetailsPage