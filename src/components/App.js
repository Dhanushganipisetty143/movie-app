import { useState, useEffect } from "react";

const API_KEY = 'e2504c32d6424aec34ff021e8f28540d';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [reviews, setReviews] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (query = '') => {
    try {
      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
        setError("No movies found!");
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  const toggleBookmark = (movie) => {
    setBookmarkedMovies((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, { ...movie, watched: false }]
    );
  };

  const markAsWatched = (movieId) => {
    setBookmarkedMovies((prev) =>
      prev.map((m) =>
        m.id === movieId ? { ...m, watched: true } : m
      )
    );
  };

  const addReview = (movieId, reviewText) => {
    setReviews((prev) => ({
      ...prev,
      [movieId]: reviewText,
    }));
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex justify-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a movie..."
          className="w-full max-w-md p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Movies List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            bookmarked={bookmarkedMovies.some((m) => m.id === movie.id)}
            toggleBookmark={toggleBookmark}
            markAsWatched={markAsWatched}
            addReview={addReview}
            review={reviews[movie.id]}
          />
        ))}
      </div>
    </div>
  );
}

function MovieCard({
  movie,
  bookmarked,
  toggleBookmark,
  markAsWatched,
  addReview,
  review,
}) {
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview(movie.id, reviewText);
    setReviewText('');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 hover:scale-105 transition transform duration-300">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-t-lg w-full h-72 object-cover"
      />
      <div className="mt-2">
        <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
        <p className="text-gray-400 text-sm mt-1 truncate">{movie.overview}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-yellow-400 font-bold">⭐ {movie.vote_average}</span>
          <button
            onClick={() => toggleBookmark(movie)}
            className={`px-4 py-1 rounded-lg ${
              bookmarked ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            {bookmarked ? 'Remove Bookmark' : 'Bookmark'}
          </button>
        </div>
        {bookmarked && (
          <div className="mt-2">
            <button
              onClick={() => markAsWatched(movie.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
            >
              Mark as Watched
            </button>
            <form onSubmit={handleReviewSubmit} className="mt-2">
              <input
                type="text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Add a review..."
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 mt-1 rounded-lg"
              >
                Submit Review
              </button>
            </form>
            {review && <p className="text-green-400 mt-2">Review: {review}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
