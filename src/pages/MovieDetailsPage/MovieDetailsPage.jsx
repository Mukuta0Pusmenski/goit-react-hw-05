import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';

const API_KEY = '76159f53b3538c0d64e32c8559b5eaef';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

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

    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
          params: {
            api_key: API_KEY,
          },
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieReviews();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.movieDetailsPage}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <h3>Actors</h3>
      <ul className={styles.actorsList}>
        {credits.map((actor) => (
          <li key={actor.cast_id}>
            <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))}
      </ul>
      <h3>Reviews</h3>
      <ul className={styles.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.content}</p>
            <p><strong>Author:</strong> {review.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetailsPage;
