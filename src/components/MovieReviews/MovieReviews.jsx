import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';

const API_KEY = '76159f53b3538c0d64e32c8559b5eaef';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
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

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className={styles.movieReviews}>
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

export default MovieReviews;
