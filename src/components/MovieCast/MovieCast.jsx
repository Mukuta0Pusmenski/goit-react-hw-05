import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjE1OWY1M2IzNTM4YzBkNjRlMzJjODU1OWI1ZWFlZiIsIm5iZiI6MTczOTU1ODE2My40Miwic3ViIjoiNjdhZjhkMTM4ODkxN2EwM2YzOGU3NDRhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.wYv_grSjLbSuGEMayv9it40gdgv3Sx3DTviXGDEueXM`
          }
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {cast.length ? (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              <p>{actor.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast available</p>
      )}
    </div>
  );
};

export default MovieCast;
