import { useState, useEffect } from "react";
import movieData from "./movies-filter-react.json";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const filteredMovies = movieData.filter((movie) =>
          movie.movietitle.toLowerCase().includes(query.toLowerCase())
        );

        setMovies(filteredMovies);
        setError("");
      } catch (err) {
        console.log(err);
        setError("Failed to fetch movies");
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length >= 3) {
      fetchMovies();
    } else {
      setMovies([]);
      setError("");
    }

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
