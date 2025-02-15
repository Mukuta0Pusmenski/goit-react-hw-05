import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

const API_KEY = '76159f53b3538c0d64e32c8559b5eaef';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieCast = () => {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
          params: {
            api_key: API_KEY,
          },
        });
        setCredits(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <div className={styles.movieCast}>
      <h3>Actors</h3>
      <ul className={styles.actorsList}>
        {credits.map((actor) => (
          <li key={actor.cast_id}>
            <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
