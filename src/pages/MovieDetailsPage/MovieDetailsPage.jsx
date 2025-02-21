import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`https://api.example.com/movies/${movieId}`);
      setMovie(response.data);
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Link to={backLinkLocationRef.current}>Back</Link>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <nav>
        <Link to="cast">Cast</Link> | <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
