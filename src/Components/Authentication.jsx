import { useNavigate } from "react-router-dom"
import useAuthStore from "../Store/authStore"
import { supabase } from "../Supabase/client"
import { useEffect } from "react"

export default function Authentication({children}){
const navigate = useNavigate()
const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
const setLoggedOut = useAuthStore((state) => state.setLoggedOut);

const checkSession = async () => {
    const sessionSupabase = await supabase.auth.getSession();
    if (sessionSupabase.data.session !== null) {
        setLoggedIn(sessionSupabase.data.session);
    }
}
useEffect(() => {
const {data: listener} = supabase.auth.onAuthStateChange((_, session) => {
    if (session === null) {
    setLoggedOut();
    navigate("/")
    }
});
checkSession();
return () => {listener.subscription.unsubscribe()}
;
},[]);
return children; 
}