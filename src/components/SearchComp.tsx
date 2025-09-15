import { Search } from "lucide-react"
import { useState } from "react"
function SearchComp() {
  const [movie,setMovie] = useState("")
  return (
    <div className="relative  mt-4">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
   <input 
   className="px-14 py-4 bg-[#1a253f]  focus:ring-2 focus:ring-blue-500 rounded-sm border border-gray-600 shadow-md " 
   type="text"
   name="movie"
   value={movie}
   onChange={(e)=>{setMovie(e.target.value)}}
   
    />
   <h1>{movie}</h1>
    </div>
    
  )
}

export default SearchComp
