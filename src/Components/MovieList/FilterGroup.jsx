import React from 'react'

const FilterGroup = ({ minRating, setMinRating, ratings }) => {
  return (
    <ul className="align_center movie_filter">
        {ratings.map((rate) => (
        <li className={minRating === rate ? 'movie_filter_item active' : 'movie_filter_item'} 
            key={rate}
            onClick={() => setMinRating(rate)}>
            {rate === 0 ? 'All' : `${rate}+ Rating`}

        </li>
        ))}
    </ul>
  );
};

export default FilterGroup