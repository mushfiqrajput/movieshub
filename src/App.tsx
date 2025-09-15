import SearchComp from "./components/SearchComp"

function App() {
  return (
    <div className="min-h-screen [font-family:'Poppins',sans-serif] bg-gradient-to-r from-[#0a0f1f] via-[#0d1228] to-[#0a0f1f] text-gray-100">
       <div className=" justify-around    items-center ">
     <img className="mx-auto" src="../public/hero-img.png" alt="a pictue" />
     <div className="flex flex-col items-center ">
     
     <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
  Explore Different Movies You Love 
</h1>

      <p className=" text-lg mt-2">
            More than 200 movies 
      </p>
      <SearchComp></SearchComp>
      
    </div>
  
    </div>
    </div>
  )
}
export default App
