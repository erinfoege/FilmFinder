import React, { useEffect, useState } from 'react'
import './MovieList.css';
import Star from '../../assets/star.png';
import MovieCard from './MovieCard';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState(0);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);

        } catch (error) {
        console.error("Error fetching movie data:", error);
        }
    }

    const handleFilter = rate => {
        setMinRating(rate);
        const filtered = movies.filter(movie=> movie.vote_average >= rate);
        setMovies(filtered);
    }   

    return (
        <section className="movie_list">
            <header className="align_center movie_list_header">
                <h2 className='align_center movie_list_heading'>Popular 
                    <img src={Star} alt="star icon" className='navbar_emoji'/>
                </h2>
            <div className='align_center movie_list_fs'>
                <ul className="align_center movie_filter">
                    <li className="movie_filter_item active" onClick={() => filterMovies(8)}>8+ Star</li>
                    <li className="movie_filter_item" onClick={() => filterMovies(7)}>7+ Star</li>
                    <li className="movie_filter_item" onClick={() => filterMovies(6)}>6+ Star</li>
                </ul>

                <select name="" id="" className="movie_sorting">
                    <option value="">SortBy</option>
                    <option value="">Date</option>
                    <option value="">Rating</option>
                </select>
                <select name="" id="" className="movie_sorting">
                    <option value="">Ascending</option>
                    <option value="">Descending</option>
                </select>
            </div>
            </header>
            <div className="movie_cards">
                {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </section>
    )
}

export default MovieList