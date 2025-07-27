import React, { useEffect, useState } from 'react';
import './MovieList.css';
import Star from '../../assets/star.png';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({ by: 'default', order: 'asc' });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Build a Discover URL that defaults to popularity.desc
  const buildUrl = ({ page, sortBy, sortOrder, minRating }) => {
    const params = new URLSearchParams({
      api_key: apiKey,
      page,
      sort_by:
        sortBy === 'default'
          ? 'popularity.desc'
          : `${sortBy}.${sortOrder}`,
    });
    if (minRating > 0) {
      params.set('vote_average.gte', minRating);
    }
    return `https://api.themoviedb.org/3/discover/movie?${params}`;
  };

  // Whenever filter or sort changes, clear existing results & reset to page 1
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [minRating, sort]);

  // Fetch new page when page, filter or sort changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const url = buildUrl({
          page,
          sortBy: sort.by,
          sortOrder: sort.order,
          minRating,
        });
        const res = await fetch(url);
        const data = await res.json();

        // Merge + dedupe by movie.id
        setMovies(prev => {
          const merged = [...prev, ...data.results];
          const uniqueMap = new Map(merged.map(m => [m.id, m]));
          return Array.from(uniqueMap.values());
        });
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, minRating, sort]);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300;
      if (nearBottom && !loading) {
        setPage(p => p + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading]);

  // Sort dropdown handler
  const handleSort = e => {
    const { name, value } = e.target;
    setSort(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Popular <img src={Star} alt="star" className="navbar_emoji" />
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
            <option value="default">Sort By</option>
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
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {loading && (
          <p className="loading_indicator">Loading more movies…</p>
        )}
      </div>
    </section>
  );
};

export default MovieList;