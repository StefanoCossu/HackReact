import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";



export default function Card({game}){
    
    const profile = useAuthStore((state) => state.profile)
    const is_Favorite = () => {
       return profile.favorites.find(el => el.game_id === game.id) 
    }
    
    

    return<Link to={`/game/${game.id}`}> 
    <div className="mb-5 mx-1 justify-center text-white bg-secondary">
        <p className="h-10 mb-5 mt-5 ms-1">{game.name}</p> 
        <img src={game.background_image} className="w-full object-cover h-40 mb-2" alt={game.name} />
        
        {profile && <div className="flex justify-center">
            <svg className={is_Favorite() ? "fill-red-500 stroke-red-500 dark:stroke-red-500 dark:fill-red-500" : "hidden"} strokeWidth={1.5}
                 height="1em" viewBox="0 0 512 512">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                    </svg>
        </div> 
        }
                 
    </div>
    </Link>
}