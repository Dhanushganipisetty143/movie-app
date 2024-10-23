// src/components/Bookmarks.js
import React from 'react';

const Bookmarks = ({ bookmarks, markAsWatched, removeBookmark }) => (
  <div className="mt-6">
    <h2 className="text-xl font-bold mb-4">Bookmarked Movies</h2>
    {bookmarks.length === 0 ? (
      <p>No movies bookmarked yet.</p>
    ) : (
      <ul>
        {bookmarks.map((movie) => (
          <li key={movie.id} className="flex justify-between items-center mb-2">
            <span>{movie.title}</span>
            <div>
              <button
                className="bg-blue-500 text-white p-1 rounded mr-2"
                onClick={() => markAsWatched(movie)}
              >
                Watched
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => removeBookmark(movie)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Bookmarks;
