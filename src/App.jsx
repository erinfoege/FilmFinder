import React,{useState} from 'react'
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import MovieList from './Components/MovieList/MovieList';

const App = () => {
  const [category, setCategory] = useState('popular');

  return (
    <div className='app'>
      <Navbar
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      <MovieList
        category={category}
      />

    </div>
  );
};
export default App