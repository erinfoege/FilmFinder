import React from 'react';
import './Navbar.css';
import Star from '../../assets/star.png';

const categories = [
  { key: 'popular',    label: 'Popular'    },
  { key: 'top_rated',  label: 'Top Rated'  },
  { key: 'upcoming',   label: 'Upcoming'   },
];

const Navbar = ({ activeCategory, onCategoryChange }) => {
  return (<nav className='navbar'>
    <h1>Film Finder</h1>
    <div className='navbar_links'>
        {categories.map(({ key, label }) => (
        <button
            key={key}
            type="button"
            className={`navbar_link${key === activeCategory ? ' active' : ''}`}
            onClick={() => onCategoryChange(key)}
          >
            {label}
            <img src={Star} alt="star icon" className='navbar_emoji'/>
        </button>
        ))}

    </div>
    </nav>
  );
};

export default Navbar;