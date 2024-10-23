// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ query, setQuery, handleSearch }) => (
  <div className="mb-4">
    <input
      type="text"
      className="border p-2 rounded w-full"
      placeholder="Search for a movie..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button
      className="bg-blue-500 text-white mt-2 p-2 rounded"
      onClick={handleSearch}
    >
      Search
    </button>
  </div>
);

export default SearchBar;
