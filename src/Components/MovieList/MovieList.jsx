import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react';
import './MovieList.css';
import Star from '../../assets/star.png';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieList = ({ category }) => {
  const [movies, setMovies]       = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort]           = useState({
    by: 'default',
    order: 'asc'
  });
  const [page, setPage]           = useState(1);
  const [loading, setLoading]     = useState(false);
  const sentinelRef               = useRef(null);

  // Reset when category changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [category]);

  // Fetch each page
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}` +
            `?api_key=${apiKey}&page=${page}`
        );
        const data = await res.json();
        setMovies(prev =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  // When the sentinel scrolls into view, load next page
  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage(p => p + 1);
      }
    },
    [loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: '200px'
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, [onIntersect]);

  // Filtering & sorting remain purely client-side
  const filtered = movies.filter(m =>
    m.vote_average >= minRating
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort.by === 'release_date') {
      const da = new Date(a.release_date);
      const db = new Date(b.release_date);
      return sort.order === 'asc' ? da - db : db - da;
    }
    if (sort.by === 'vote_average') {
      return sort.order === 'asc'
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average;
    }
    return 0;
  });

  const handleSort = e => {
    const { name, value } = e.target;
    setSort(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {category.replace('_', ' ').toUpperCase()}
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
        {sorted.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* sentinel for IntersectionObserver */}
      <div ref={sentinelRef} />

      {loading && <p className="loading_indicator">Loading more…</p>}
    </section>
  );
};

export default MovieList;