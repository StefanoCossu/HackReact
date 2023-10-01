import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { supabase } from "../../supabase/client";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as HalfStar } from "../../assets/icons/halfStar.svg";
import { useTranslation } from "react-i18next";
import Button from "../uI/Button";
import { Link } from "react-router-dom";

export default function Votes({game}){
const maxVotes= [1,2,3,4,5]
const profile = useAuthStore((state) => state.profile);
const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
const [checker,setChecker]=useState(false)
const [voters,setVoters]=useState(0)
const [media,setMedia]=useState(0)
const [score,setScore]=useState(0)
const[vote,setVote]=useState(0)
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
    return profile.votes.find((el) => +el.game_id === game.id);
  };
const giveVote = async (vote) => {

    const data = await supabase.auth.getSession();
    if (!isVoted()) {
       
        const { info, error } = await supabase 
        .from("votes")
        .insert({ user_id: profile.id, vote: +vote, game_id: game.id })
        .select(); 
    }

    setLoggedIn(data.data.session);
    setChecker(true)
}
const result = async ()=>{
    const { data, error } = await supabase 
        .from("votes")
        .select('*')
        .eq('game_id', game.id)
        
    setScore(data.map(el=>{return el.vote}).reduce((a, b) => a + b, 0))    
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
    setMedia(Math.round(((score/voters) + Number.EPSILON)* 100)/100) 
    }
    
},[score])

return(<div className=" rounded-lg flex justify-center items-center mt-[200px] h-[250px] myShadow pb-5 md:mx-[100px] bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] border-2 border-white">
    {!checker && <div className="w-full text-white mx-auto">
    <div className="title-wrapper mb-5 grid items-center justify-center pb-4">
          <div className="sweet-title">
              <span className={`bottom-title before:contents-[I giochi più di successo del trimestre]  bg-gradient-to-r from-[#096067] from-98% via-98%  via-[#541c97] to-[#541c97]  bg-clip-text text-transparent`}>
                      <h2 className="-skew-x-12">Dai un voto a {game.name}</h2>  
              </span>
            </div>
      </div>
        <div className="flex w-100 justify-center items-center pt-[10px] pb-[20px] ">
        {maxVotes.map(el=>{
            return <div key={el} onClick={()=>setVote(el)} className={`cursor-pointer mx-2 relative flex items-center w-[50px] `}>  
            <div className={`w-[1.5rem] h-[1.5rem] rounded-2xl flex justify-center items-center  bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] z-[2] p-2 m-2 relative ${active ? active >= el ? " before:rounded-full after:rounded-full myStar" : "":""}`}>
                    <span className={`rounded-2xl ${el<=vote ? "fill-yellow-400 stroke-yellow-400 dark:stroke-yellow-400 dark:fill-yellow-400" : "fill-gray-400 stroke-gray-400 dark:stroke-gray-500 dark:fill-gray-500"} ${active ? active >= el ? "  fill-yellow-300 stroke-yellow-300 dark:stroke-yellow-300 dark:fill-yellow-300" : "fill-gray-400 stroke-gray-400 dark:stroke-gray-500 dark:fill-gray-500": "fill-gray-400 stroke-gray-400 dark:stroke-gray-500 dark:fill-gray-500"}`} onMouseOver={()=>{setActive(el)}} onMouseOut={()=>{setActive(null)}}>
                    <Star/>
                    </span>
                </div>
                    
                    <div className={`${active == el ? "flex":"hidden"} absolute text-white text-center left-[-25px] bottom-[50px]`}>
                    <p className="w-[100px]">{t(`gameDetail.vote${el}`)}</p>
                    </div>
                 </div>
        })
        }
        </div>
        <div className="w-100 flex justify-center">
            <div className="myBox before:rounded-xl after:rounded-xl bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] flex relative justify-center items-center z-[2]">
                <span className={`${vote>0 ? "block":"hidden"}`}>
                <Button label={"VOTA"} onClick={()=>giveVote(vote)}/>
                </span>
                
            </div>
        </div>
    </div>}
    {checker && <>
        <div className={`${voters == 0 ? "hidden":""}`} >
            <div className="title-wrapper mb-3 grid items-center justify-center pt-5 pb-2">
                <div className="sweet-title">
                        <span className={`bottom-title before:contents-[I giochi più di successo del trimestre]  bg-gradient-to-r from-[#096067] from-98% via-98%  via-[#541c97] to-[#541c97]  bg-clip-text text-transparent`}>
                      <h2 className="-skew-x-12">Il voto della community su {game.name}</h2>  
                    </span>
                </div>
            </div>
            <div className="w-full flex justify-center py-[25px]">
            {maxVotes.map(el=>{
                return <div key={el} className="mx-2">
                        <span className={`${el <= media ? "fill-yellow-500 stroke-yellow-500 dark:stroke-yellow-500 dark:fill-yellow-500" : (media - (el-1)) > 0 ? "fill-yellow-500 stroke-yellow-500 dark:stroke-yellow-500 dark:fill-yellow-500":"fill-gray-400 stroke-gray-400 dark:stroke-gray-500 dark:fill-gray-500"}`}>
                            {starSelector(el)}
                        </span>
                    </div>
            })}
            </div>
            <div className="text-white text-center">Hanno votato {voters} con un media di {media}</div>     
    </div>
    <div className={`${voters == 0 ? "":"hidden"} relative flex flex-col items-center justify-center`}>
                
                    <h3 className="text-center font-semibold font-title text-4xl px-5 bg-gradient-to-r from-[#00BECC] from-40% via-90%  via-[#b094d3] to-[#b499d4] text-transparent  bg-clip-text ">Nessuno ha ancora votato {game.name}.. Loggati e sii il primo!</h3>
                    <div className="myBox before:rounded-xl after:rounded-xl bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] flex relative justify-center items-center z-[2] mt-5">
                    <span className="">
                        <Link to={'/login'}><Button label={t("common.login")}/></Link>
                    </span>
                    </div>
    </div>
    </>
}
    </div>
)}