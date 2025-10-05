import { useEffect, useState } from "react"
import SearchComp from "./components/SearchComp"
import Spinner from './components/Spinner'
import MovieCard from "./components/MovieCard"
import type { Movie } from './types/movie';
import {useDebounce} from 'react-use'
import {updateSearchCount} from '../appwrite'
import {getTrendingMovies} from '../appwrite'


function App() {
  const [movie,setMovie] = useState("")
  const [debouncedTerm,setDebouncedTerm] = useState("")
  const [trendingMovies,setTrendingMovies] = useState<Movie[]>([])
  const [movieList,setMovieList]=useState<Movie[]>([])
  const [loader,setLoader]=useState(false)
  const DISCOVER_URL = 
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const SEARCH_URL = 
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query="
 

    useDebounce(()=> setDebouncedTerm(movie),500,[movie])

const fetchMovies = async (query:string) => {
  setLoader(true)
  try {
    const endpoint= movie.trim() ? `${SEARCH_URL}${encodeURIComponent(movie)}` : DISCOVER_URL
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2FiMDc1NzI3NWMxNDZjMDAwMzEyNWY2OTQyZDBmOCIsIm5iZiI6MTc1NzkyODgwMC43MDIwMDAxLCJzdWIiOiI2OGM3ZGQ2MDFiY2I4ODZlMjdhMGY2YjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.r7a89uV0eN0mIN9OmdNt4AEW2S-p38rBpOq10jR5BiM",
      },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    setMovieList(data.results as Movie[])
    if(query && data.results.length > 0){
    await  updateSearchCount(query,data.results[0])
    }
    console.log(data); // ✅ See result in browser console
  } catch (error) {
    console.error("Fetch error:", error);
  }finally{
    setLoader(false)
  }
};


const trendingFive = async () => {
  try {
    const rows = await getTrendingMovies();

    // 🟢 Convert DefaultRow[] → Movie[]
    if (rows) {
      setTrendingMovies(
        rows.map((row) => ({
          id: row.movie_id, // map to your Movie type
          title: row.movie,
          poster_path: row.poster_url,
          vote_average: row.count ?? 0,
          
        })) as Movie[]
      );
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(()=>{
  trendingFive()
},[])
useEffect(() => {
  fetchMovies(debouncedTerm);
}, [debouncedTerm]);
  return (
    <div className="min-h-screen flex justify-center [font-family:'Poppins',sans-serif] bg-gradient-to-r from-[#0a0f1f] via-[#0d1228] to-[#0a0f1f] text-gray-100">
      <div className="  justify-around    items-center ">
        <img className="mx-auto" src="../public/hero-img.png" alt="a pictue" />
        <div className="flex flex-col items-center ">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Explore Different Movies You Love 
          </h1>
          <p className=" text-lg mt-2">
            More than 200 movies 
          </p>
          <SearchComp movie={movie} setMovie={setMovie}></SearchComp>
        </div>
        {
  trendingMovies.length > 0 && (
    <section className="mt-10">
      <h2 className="text-3xl font-bold mb-6">Trending Movies</h2>
      <div className="grid grid-cols-4 gap-6">
        {trendingMovies.slice(0, 4).map((movie, index) => (
          <div
            key={movie.id}
            className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* 🔢 Big Number Overlay */}
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-6xl font-bold text-white/90 drop-shadow-lg">
              {index + 1}
            </span>

            {/* 🖼 Poster */}
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "/no-moive.png"
              }
              alt={movie.title}
              className="w-full h-full object-cover object-center relative z-10 transform group-hover:scale-105 transition-transform duration-300"
            />

            {/* ⭐ Rating Badge */}
            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-lg z-20">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}



       <h2 className="mt-44 text-4xl ">ALL MOVIES</h2>
       <div className="grid grid-cols-4 gap-4">
       {
          loader? (
            <Spinner/>
          ): (
            
            movieList.map((movie)=> (
           <MovieCard key={movie.id} movie={movie} />
            ))
          
          )
        }
       </div>
      </div>
    </div>
  )
}
export default App
