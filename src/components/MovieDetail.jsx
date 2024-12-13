import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function MovieDetail() {
  const API_URL = `https://api.themoviedb.org/3/movie/`;
  const API_KEY = "?api_key=33cfc2062d1d3fb45c8fd10fbd1a533c";

  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const searchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}${id}${API_KEY}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Something Went Wrong with Fetching Movies 😔");
        }

        const data = await response.json();
        console.log(data);
        setMovies(data);
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

    searchMovies();

    return function () {
      controller.abort();
    };
  }, [id]);

  const {
    original_title,
    overview,
    poster_path,
    vote_average,
    budget,
    tagline,
    origin_country,
    revenue,
  } = movies;

  const MOVIE_POSTER_URL = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  //   const FALLBACK_IMAGE =
  //     "https://applescoop.org/image/wallpapers/mac/m3-macbook-pro-default-black-x-dark-17-09-2024-1726606448.jpg";

  return (
    <>
      <section className="">
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <div className="max-w-7xl mx-auto">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                <div>
                  <span className="rounded-full bg-yellow-500 text-black p-4 inline-block mb-4">
                    {vote_average ? vote_average.toFixed(1) : ""}
                  </span>
                  <div className="max-w-lg md:max-w-none">
                    <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                      {original_title}
                    </h2>

                    <p className="mt-4 text-gray-700">{overview}</p>
                  </div>
                </div>

                <div>
                  <img
                    src={MOVIE_POSTER_URL}
                    className="rounded-md object-cover h-[600px] "
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* Details  */}
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">budget</dt>
                  <dd className="text-gray-700 sm:col-span-2">${budget}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Country</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {origin_country}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Tagline</dt>
                  <dd className="text-gray-700 sm:col-span-2">{tagline}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Revenue</dt>
                  <dd className="text-gray-700 sm:col-span-2">${revenue}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Bio</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
                    facilis debitis explicabo doloremque impedit nesciunt
                    dolorem facere, dolor quasi veritatis quia fugit aperiam
                    aspernatur neque molestiae labore aliquam soluta architecto?
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
        {error && <p className="text-3xl text-center">{error}</p>}
      </section>
    </>
  );
}
