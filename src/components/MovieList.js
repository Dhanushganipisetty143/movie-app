import { useEffect, useState } from "react";

const API_KEY = 'e2504c32d6424aec34ff021e8f28540d';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  // Fetch popular movies from the API
  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg p-4 hover:scale-105 transition transform duration-300">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-t-lg w-full h-72 object-cover"
          />
          <div className="mt-2">
            <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
            <p className="text-gray-400 text-sm mt-1 truncate">{movie.overview}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-yellow-400 font-bold">
                ⭐ {movie.vote_average}
              </span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg">
                More Info
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
