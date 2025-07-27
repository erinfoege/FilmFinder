import React, { useEffect, useState } from 'react';
import './MovieList.css';
import Star from '../../assets/star.png';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: 'default',
    order: 'asc',
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const filteredMovies = movies.filter(
    movie => movie.vote_average >= minRating
  );

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sort.by === 'release_date') {
      return sort.order === 'asc'
        ? new Date(a.release_date) - new Date(b.release_date)
        : new Date(b.release_date) - new Date(a.release_date);
    } else if (sort.by === 'vote_average') {
      return sort.order === 'asc'
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average;
    }
    return 0; // default sort — no change
  });

  const handleSort = e => {
    const { name, value } = e.target;
    setSort(prevSort => ({ ...prevSort, [name]: value }));
  };

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Popular
          <img src={Star} alt="star icon" className="navbar_emoji" />
        </h2>
        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            setMinRating={setMinRating}
            ratings={[8, 7, 6, 0]}
          />

          <select
            name="by"
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {sortedMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;