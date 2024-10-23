// src/components/MovieList.js
import React from 'react';

const MovieList = ({ movies, onBookmark }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {movies.map((movie) => (
      <div
        key={movie.id}
        className="border rounded-lg p-4 shadow-md bg-gray-200"
      >
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <button
          className="bg-green-500 text-white mt-2 p-1 rounded"
          onClick={() => onBookmark(movie)}
        >
          Bookmark
        </button>
      </div>
    ))}
  </div>
);

export default MovieList;
