
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-[#161F54] rounded-2xl hover:cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-xs mx-auto">
      {/* Image Section with Aspect Ratio */}
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/no-movie.png"
          }
          alt={movie.title}
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-lg">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 text-white">
        {/* Title */}
        <h3 className="text-lg font-bold truncate">{movie.title}</h3>

        {/* Release Date */}
        <p className="text-sm text-gray-400 mt-1">
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Release date unknown"}
        </p>


        
      </div>
    </div>
  );
}

export default MovieCard;
