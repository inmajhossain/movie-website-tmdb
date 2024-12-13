import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";

function MovieFeed() {
  const API_URL = `https://api.themoviedb.org/3/search/movie?query=`;
  const API_KEY = "&api_key=33cfc2062d1d3fb45c8fd10fbd1a533c";

  const [search, setSearch] = useState("batman");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const searchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}${search}${API_KEY}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Something Went Wrong with Fetching Movies 😔");
        }

        const data = await response.json();
        console.log(data);
        setMovies(data.results);
      } catch (err) {
        console.log(err);
        if (err.name !== "AbortError") {
          setError(err.message);
          console.log(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (search.length >= 3) {
      setError("");
      searchMovies();
    }

    return function () {
      controller.abort();
    };
  }, [search]);

  return (
    <>
      <header className="bg-gray-900 py-[6rem]">
        <h2 className="text-center text-gray-300 font-bold pb-4 text-3xl">
          Search for movies!
        </h2>
        <div className="relative max-w-[700px] mx-auto">
          <form>
            <label htmlFor="Search" className="sr-only">
              {" "}
              Search{" "}
            </label>

            <input
              type="text"
              id="Search"
              placeholder="Search for..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm border-2 border-gray-200 px-2"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </form>
        </div>
      </header>

      <section className="max-w-6xl mx-auto mt-10">
        {isLoading && <Loader />}
        {!isLoading && !error && movies.length !== 0 && (
          <div className="grid grid-cols-3 gap-10">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        {error && <p className="text-3xl text-center">{error}</p>}
      </section>
    </>
  );
}

export default MovieFeed;
