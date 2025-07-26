import React from 'react'
import './MovieCard.css';
import Star from '../../assets/star.png';

function truncate(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
}

const MovieCard = ({movie}) => {
  return (
    <a href={`https://www.themoviedb.org/movie/${movie.id}`} className="movie_card">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="Movie Poster"
        className="movie_poster"
        />
        <div className="movie_details">
            <h3 className='movie_details_heading'>{movie.original_title}</h3>
            <div className="align_center movie_date_rate">
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average} <img src={Star} alt="rating icon"
                className="card_emoji" /></p>
            </div>
            <p className="movie_description">{truncate(movie.overview, 400)}</p>
        </div>
     </a>
  )
}

export default MovieCard