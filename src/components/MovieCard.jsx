import { Link } from "react-router";

/* eslint-disable react/prop-types */
export default function MovieCard({ movie }) {
  const { original_title, overview, poster_path, vote_average, id } = movie;

  const MOVIE_POSTER_URL = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const FALLBACK_IMAGE =
    "https://applescoop.org/image/wallpapers/mac/m3-macbook-pro-default-black-x-dark-17-09-2024-1726606448.jpg";

  return (
    <div>
      <Link
        to={`/movie/${id}`}
        className="group relative block bg-black h-[400px]"
      >
        <img
          alt={original_title}
          src={poster_path ? MOVIE_POSTER_URL : FALLBACK_IMAGE}
          className="absolute inset-0 h-full w-full object-cover object-bottom opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-widest bg-yellow-500 inline-block text-gray-900 p-2 rounded-full">
            {vote_average.toFixed(1)}
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">
            {original_title}
          </p>

          <div className="mt-32 sm:mt-48 lg:mt-64">
            <div className="-translate-y-28 transform opacity-0 transition-all group-hover:-translate-y-20 group-hover:opacity-100">
              <p className="text-sm text-white">{overview.slice(0, 150)}....</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
