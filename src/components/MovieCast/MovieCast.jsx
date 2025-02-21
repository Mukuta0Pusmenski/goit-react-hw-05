import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await axios.get(`https://api.example.com/movies/${movieId}/cast`);
      setCast(response.data);
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {cast.length ? (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      ) : (
        <p>No cast available</p>
      )}
    </div>
  );
};

export default MovieCast;
