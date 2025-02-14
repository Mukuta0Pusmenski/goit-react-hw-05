import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './MoviesPage.module.css';

const API_KEY = '76159f53b3538c0d64e32c8559b5eaef';
const BASE_URL = 'https://api.themoviedb.org/3';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query === '') return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            query: query,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div className={styles.moviesPage}>
      <SearchBar onSubmit={handleSearch} />
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
