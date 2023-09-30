import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { supabase } from "../../supabase/client";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as HalfStar } from "../../assets/icons/halfStar.svg";
import { useTranslation } from "react-i18next";

export default function Votes(game){
const maxVotes= [1,2,3,4,5]
const profile = useAuthStore((state) => state.profile);
const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
const [checker,setChecker]=useState(false)
const [voters,setVoters]=useState(0)
const [media,setMedia]=useState(0)
const [score,setScore]=useState(0)
const[vote,setVote]=useState()
const [active,setActive]=useState()
const {t} = useTranslation();

const starSelector=(n) => {
if (media >= n) {
    return <Star/>
}
if ((media - (n-1)) > 0) {
    return <HalfStar/>
}
return <Star/>
}
const isVoted = () => {
    return profile.votes.find((el) => +el.game_id === game.gameId);
  };
const giveVote = async (vote) => {

    const data = await supabase.auth.getSession();
    if (!isVoted()) {
       
        const { info, error } = await supabase 
        .from("votes")
        .insert({ user_id: profile.id, vote: +vote, game_id: game.gameId })
        .select(); 
    }

    setLoggedIn(data.data.session);
    setChecker(true)
}
const result = async ()=>{
    const { data, error } = await supabase 
        .from("votes")
        .select('*')
        .eq('game_id', game.gameId)
        
    setScore(Math.round((data.map(el=>{return el.vote}).reduce((a, b) => a + b, 0))*100)/100)    
    setVoters(data.length)      
}
useEffect(()=>{
    if (profile) {
        setChecker(isVoted())
    }else if( !profile){
        setChecker(true)
    }
},[])
useEffect(()=>{
    result()
},[checker])
useEffect(()=>{
    if (voters>0) {
    setMedia(score/voters) 
    }
    
},[score])

return(<>
    {!checker && <div className="h-[300] w-full mt-6 text-white mx-auto">
        <div className="bg-white flex w-100 justify-center items-center ">
        {maxVotes.map(el=>{
            return <div key={el} onClick={()=>setVote(el)} className={`cursor-pointer mx-2 h-[200px] relative flex items-center w-[50px] `}>
                    <span className={`${el<=vote ? "fill-yellow-500 stroke-yellow-500 dark:stroke-yellow-500 dark:fill-yellow-500" : "fill-gray-400 stroke-gray-400 dark:stroke-gray-500 dark:fill-gray-500"}`} onMouseOver={()=>{setActive(el)}} onMouseOut={()=>{setActive(null)}}>
                    <Star/>
                    </span>
                    <div className={`${active == el ? "flex":"hidden"} absolute bg-gray-500 text-white text-center left-[-25px] bottom-[50px]`}>
                    <p className="w-[100px]">{t(`gameDetail.vote${el}`)}</p>
                    </div>
                 </div>
        })
        }
        </div>
        <div className="w-100 h-[300px] text-center cursor-pointer my-5" onClick={()=>(giveVote(vote))}>VOTA</div>
    </div>}
    {checker && <div className={`${voters == 0 ? "hidden":""}`} >
            <div className="text-white">Hanno votato {voters} con un media di {media}</div>
            <div className="w-full flex justify-center">
            {maxVotes.map(el=>{
                return <div key={el} className="mx-2">
                        <span className={`${el<=media ? "fill-yellow-500 stroke-yellow-500 dark:stroke-yellow-500 dark:fill-yellow-500" : (media - (el-1)) > 0 ? "fill-yellow-500 stroke-yellow-500 dark:stroke-yellow-500 dark:fill-yellow-500":"fill-gray-400 stroke-gray-400 dark:stroke-gray-500 dark:fill-gray-500"}`}>
                            {starSelector(el)}
                        </span>
                    </div>
            })}
            </div>
            
        </div>}
    </>
)}