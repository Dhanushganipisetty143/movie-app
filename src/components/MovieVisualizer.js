// src/components/MovieVisualizer.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import Bookmarks from './Bookmarks';

const MovieVisualizer = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem('bookmarks')) || []
  );

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleSearch = async () => {
    const API_KEY = 'e2504c32d6424aec34ff021e8f28540d';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  const handleBookmark = (movie) => {
    setBookmarks((prev) => [...prev, movie]);
  };

  const markAsWatched = (movie) => {
    alert(`${movie.title} marked as watched!`);
  };

  const removeBookmark = (movie) => {
    setBookmarks((prev) =>
      prev.filter((bookmark) => bookmark.id !== movie.id)
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Movie Visualizer</h1>
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <MovieList movies={movies} onBookmark={handleBookmark} />
      <Bookmarks
        bookmarks={bookmarks}
        markAsWatched={markAsWatched}
        removeBookmark={removeBookmark}
      />
    </div>
  );
};

export default MovieVisualizer;