import React from 'react';
import './Navbar.css';
import Star from '../../assets/star.png';



const Navbar = () => {
  return (<nav className='navbar'>
    <h1>Film Finder</h1>
    <div className='navbar_links'>
        <a href="">Popular <img src={Star} alt="star icon" className='navbar_emoji'/></a>
        <a href="">Top Rated <img src={Star} alt="star icon" className='navbar_emoji'/></a>
        <a href="">Upcoming <img src={Star} alt="star icon" className='navbar_emoji'/></a>
    </div>
    </nav>
  );
};

export default Navbar;