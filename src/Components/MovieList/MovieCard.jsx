import React from 'react'
import './MovieCard.css';
import Star from '../../assets/star.png';

const MovieCard = () => {
  return (
    <a href="#" className="movie_card">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSefQTwEhNM3vNw5sGZRdEnXo5kg1TSQj3Cgg&s"
        alt="Movie Poster"
        className="movie_poster"
        />
        <div className="movie_details">
            <h3 className='movie_details_heading'>Movie Title</h3>
            <div className="align_center movie_date_rate">
                <p>Release Date: 2023-01-01</p>
                <p>Rating: 8.5 <img src={Star} alt="rating icon"
                className="card_emoji" /></p>
            </div>
            <p className="movie_description">This is a brief description of the movie. It gives an overview of the plot and main themes.</p>
        </div>
     </a>
  )
}

export default MovieCard