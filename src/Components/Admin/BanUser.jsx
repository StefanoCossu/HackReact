import { useEffect, useState } from "react"
import { supabase } from "../../Supabase/client";
import useAuthStore from "../../Store/authStore";
import { Toaster, toast } from "react-hot-toast";

export default function BanUser({user, getData, banned}){
    const [date, setDate] = useState("");
    const profile = useAuthStore((state) => state.profile)
    
    const [isAdmin, setIsAdmin] = useState(false)
    
    const get_claim = async (uid, claim) => {
        const { data } = await supabase
        .rpc('get_claim', {uid, claim});
        setIsAdmin(data)
        return 
      }

    useEffect(()=>{
        get_claim(user, "claims_admin")
        },[])

    const checker =  () => {
        return (profile.id === user || !date || isAdmin)
      }  
      
      
      
    const ban = async (action) => {
        const { data, error } = await supabase
        .from("profiles")
        .update({banned_until: action ? date : null})
        .eq("id", user)
        .select();
        console.log(data, error);
        if (!error) {
            toast.success("Azione riuscita")
        }else{
            toast.error(error.message)
        }
        
    getData();
    }
    
    return (<>
    <Toaster /> 
    <div className=" flex items-center justify-between">
            {banned ? (
            <>
            <span>Togli ban all&apos;utente</span>
            <button type="button" onClick={() => ban(false)} className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <svg
                xmlns="http://www.w3.org/200/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16">
                </svg>
                <path fillRule="evernodd"
                d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.108l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.107V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5.-5z"/>
            </button>
            </>) :
            (<>
            <input className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-300 dark:focus:ring-blue-500" type="date" 
            value={date} onChange={(e) => setDate(e.target.value)} />
            <button className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white" disabled={checker()} onClick={() => ban(true)}>
                <svg xmlns="http://www.w3.org/200/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16">
                    <path fillRule="evernodd" 
                    d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z"/>
                </svg>
            </button>
            </>)}
        </div>
    </>
        
    )  
}
