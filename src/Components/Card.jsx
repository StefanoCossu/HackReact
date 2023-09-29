import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
export default function Card({game}){
    const profile = useAuthStore((state) => state.profile)
    console.log(game);
    const is_Favorite = () => {
        if(profile && profile.favorites) return profile.favorites.find(el => el.game_id === game.id) 
        return false
    }    
    
     return(
    <Link to={`/game/${game.id}`}> 
     <div className="minip myShadow w-[300px] h-[400px] relative mt-4 mx-5  bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3]">
        <div className="mg w-full h-[200px] absolute top-0 left-0 grid">
         <div className="clr"></div>
             <div className="group">
                {game.metacritic &&
                    <span className="bg-[#233a59] border-[#14496c] dark:bg-[#233a59]  bg-opacity-70 border-2"> 
                    <p className="text-center bg-gradient-to-r  to-98%  bg-clip-text font-extrabold text-transparent from-[#28627f] to-sky-100">{game.metacritic}</p> 
                    <p className="bg-gradient-to-r  to-98%  bg-clip-text font-extrabold text-transparent from-sky-600 to-sky-100">
                    Metacritic:
                    </p>
                </span> 
                }
                
            </div>
         </div>
     <div className="av" style={{backgroundImage:`url(${game.background_image})`}}></div>
 <div className="info">
     <span className="name border-2 bg-[#233a59] border-[#14496c] dark:bg-[#233a59] bg-opacity-80">
        <p className="bg-gradient-to-r  to-98%  bg-clip-text font-extrabold text-transparent from-sky-600 to-sky-100">{game.name}</p>
    </span>
 <div>
     <ul className="my-3 border-2 deets bg-[#233a59] border-[#14496c] dark:bg-[#233a59] bg-opacity-80">
         {game.genres && game.genres.map((el,i)=>{
             if(i>3)return
             return <li className="bg-gradient-to-r  to-98%  bg-clip-text font-bold text-transparent from-sky-600 to-sky-100" key={el.id}>{el.name}</li>
         })}
     </ul>
 </div>
     <div className={`plot  ${is_Favorite()? "block":"hidden"}`}>
     {<svg className={is_Favorite() ? "fill-red-500 z-10 relative stroke-red-500 dark:stroke-red-500 dark:fill-red-500" : "hidden"} strokeWidth={1.5}
                height="1.5em" viewBox="0 0 512 512">
             <path
             strokeLinecap="round"
             strokeLinejoin="round" 
             d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
             </svg>
            }
     
     </div>
 </div> 
 </div>
 </Link>
)}

