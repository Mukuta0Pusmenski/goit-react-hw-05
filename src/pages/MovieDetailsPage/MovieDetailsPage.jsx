import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = useRef(location);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`https://api.example.com/movies/${movieId}`);
      setMovie(response.data);
    };
    fetchMovie();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(previousLocation.current.state?.from || '/');
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <button type="button" onClick={handleGoBack}>Go Back</button>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <nav>
        <Link to="cast" state={{ from: location }}>Cast</Link> | <Link to="reviews" state={{ from: location }}>Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
