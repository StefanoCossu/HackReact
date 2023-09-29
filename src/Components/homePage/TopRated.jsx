import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function TopRated(){
const profile =  useAuthStore((state) => state.profile);
const [games,setGames]=useState()
const [active,setActive]=useState()
const [scrollTop, setScrollTop] = useState(0);
const [is_viewed,setIs_viewed] = useState()
console.log(scrollTop);
console.log(profile);
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
   if (profile) {
    if (scrollTop >= 500) {
      setIs_viewed(true)
      
    }
   }else if(!profile){
    if (scrollTop >= 200) {
      setIs_viewed(true)
      
    }
   }

    

},[scrollTop])

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
<div  className={`hidden md:flex  ${ is_viewed ? "sectionRight" : "opacity-0"}  relative w-100 p-10  flex-col h-fit mx-10 mt-[100px] myShadow bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] `}>
    <h3 className="w-full mb-6 text-center font-semibold font-title text-4xl px-5 bg-gradient-to-r from-[#00BECC] from-40% via-90%  via-[#b094d3] to-[#b499d4] text-transparent  bg-clip-text">I giochi più di successo del trimestre</h3>
    <div className="w-100 flex h-fit overflow-hidden">
    {games && games.results.map((game,i) =>{
        return (    
            <div className={`w-1/4 -skew-x-12 overflow-hidden relative ${is_viewed ? "d-block":"hidden"}  ${i==3 ? "mr-7" :""} ${i==0 ? "ml-7" :""} best${i}`} onMouseOver={()=>{setActive(i)}} onMouseOut={()=>{setActive(null)}} key={game.id}>
                <Link to={`/game/${game.id}`}>
                <img src={game.background_image} alt={game.name} className={` transition duration-[2s] ${active == i ? "opacity-100 scale-125 ":"opacity-60"}`}/>
                </Link>
                <p className={`absolute bottom-4 left-6 border-2 px-2 text-white bg-[#6a93cb] border-[#14496c] dark:bg-[#14496cb3] ${active== i ? "block":"hidden"}`}>{game.name}</p>
            </div>)
            
    })
    }
    </div>
    
</div>
)}