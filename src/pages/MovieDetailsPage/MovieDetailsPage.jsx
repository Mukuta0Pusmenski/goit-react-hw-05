import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjE1OWY1M2IzNTM4YzBkNjRlMzJjODU1OWI1ZWFlZiIsIm5iZiI6MTczOTU1ODE2My40Miwic3ViIjoiNjdhZjhkMTM4ODkxN2EwM2YzOGU3NDRhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.wYv_grSjLbSuGEMayv9it40gdgv3Sx3DTviXGDEueXM`
          }
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Link to={backLinkLocationRef.current}>Back</Link>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <nav>
        <Link to="cast">Cast</Link> | <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
