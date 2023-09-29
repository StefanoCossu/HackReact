import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { supabase } from "../../supabase/client";

export default function Votes(game){
const profile = useAuthStore((state) => state.profile);
const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
const [checker,setChecker]=useState(false)
const [voters,setVoters]=useState(0)
const [media,setMedia]=useState(0)
const [score,setScore]=useState(0)
const isVoted = () => {
    return profile.votes.find((el) => +el.game_id === game.gameId);
  };
const giveVote = async (value) => {
    const vote = +value
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
    setScore(data.map(el=>{return el.vote}).reduce((a, b) => a + b, 0))    
    setVoters(data.length)      
}
useEffect(()=>{
   setChecker(isVoted())
    result()
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
        <div onClick={()=>giveVote(1)} className=" cursor-pointer mx-2">1</div>
        <div onClick={()=>giveVote(2)} className="cursor-pointer mx-2">2</div>
        <div onClick={()=>giveVote(3)} className="cursor-pointer mx-2">3</div>
        <div onClick={()=>giveVote(4)} className="cursor-pointer mx-2">4</div>
        <div onClick={()=>giveVote(5)} className="cursor-pointer mx-2">5</div>
    </div>}
    {checker && <div>
            <div>Hanno votato {voters}</div>
            <div>Voto {media}</div>
        </div>}
    </>
)}