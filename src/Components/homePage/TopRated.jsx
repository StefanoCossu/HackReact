import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TopRated(){
const [games,setGames]=useState()
const [active,setActive]=useState()
const [scrollTop, setScrollTop] = useState(0);
const [is_viewed,setIs_viewed] = useState([])
useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
  }, []);

useEffect(()=>{
    if (scrollTop >= 200) {
        if (!Array.prototype.includes.call(is_viewed, 1)) setIs_viewed((prev)=> [...prev,1])
        
     }
    if (scrollTop >= 500) {
       if (!Array.prototype.includes.call(is_viewed, 2)) setIs_viewed((prev)=> [...prev,2])
       
    }
   if(is_viewed) console.log( typeof is_viewed , is_viewed);
},[scrollTop])

  
  console.log(scrollTop);
const date = new Date()
let day = date.getDate();
if(day < 10) day = `0${day}`;
let month = date.getMonth() +1 ;
if(month < 10 ) month =`0${month}`;
let year = date.getFullYear();
const today = `${year}-${month}-${day}`

function subtractMonths(date, months) {
    date.setMonth(date.getMonth() - months);
    return date;
}

const newDate = subtractMonths(date, 3);
let monthstart = newDate.getMonth() +1 ;
if(monthstart < 10 ) monthstart =`0${monthstart}`;
let yearstart = date.getFullYear();
const start = `${yearstart}-${monthstart}-01`
useEffect(()=>{
    fetch(
        `${import.meta.env.VITE_RAWG_API_URL}/games?key=${
            import.meta.env.VITE_RAWG_API_KEY
          }&metacritic=80.100&dates=${start},${today}&page_size=4`
          )
            .then((r) => r.json())
            .then((r) => {
              setGames(r);
            });
},[])

return(
<div  className={`hidden md:flex ${ Array.prototype.includes.call(is_viewed, 1) ? "closeRight" : "opacity-0"}  relative w-100 p-10  flex-col h-fit mx-10 mt-[100px] myShadow bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] `}>
    <h3 className="w-full mb-6 text-center font-semibold font-title text-4xl px-5 bg-gradient-to-r from-[#00BECC] from-40% via-90%  via-[#b094d3] to-[#b499d4] text-transparent  bg-clip-text">I giochi più di successo del trimestre</h3>
    <div className="w-100 flex h-fit overflow-hidden">
    {games && games.results.map((game,i) =>{
        return (    
            <div className={`w-1/4 -skew-x-12 transition-[2s] relative ${active == i ? "opacity-100":"opacity-60"} ${i==3 ? "mr-7" :""} ${i==0 ? "ml-7" :""} best${i}`} onMouseOver={()=>{setActive(i)}} onMouseOut={()=>{setActive(null)}} key={game.id}>
                <Link to={`/game/${game.id}`}>
                <img src={game.background_image} alt={game.name} />
                </Link>
                <p className={`absolute bottom-4 left-6 border-2 px-2 text-white bg-[#6a93cb] border-[#14496c] dark:bg-[#14496cb3] ${active== i ? "block":"hidden"}`}>{game.name}</p>
            </div>)
            
    })
    }
    </div>
    
</div>
)}