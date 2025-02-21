import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjE1OWY1M2IzNTM4YzBkNjRlMzJjODU1OWI1ZWFlZiIsIm5iZiI6MTczOTU1ODE2My40Miwic3ViIjoiNjdhZjhkMTM4ODkxN2EwM2YzOGU3NDRhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.wYv_grSjLbSuGEMayv9it40gdgv3Sx3DTviXGDEueXM`
          }
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p><strong>{review.author}</strong></p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default MovieReviews;
