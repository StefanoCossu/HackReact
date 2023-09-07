import { useState } from "react"
import Input from "../Components/Input";
import { supabase } from "../Supabase/client";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [message, setMessage] = useState("");
    
const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
const navigate = useNavigate()
const submit = async (e) => {
        e.preventDefault();
        try{
         const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password,
         });
         if(error){
            throw error;
         }
         if(data.session !== null){
            setLoggedIn(data.session)
            navigate("/")
         }
        }catch(error){
            console.log(error);
        }
        return 
    }
    
    return <div className="lg:w-1/2 mx-auto mt-24 min-h-screen">
        <p className="text-center text-white font-bold text-2xl">Login</p>
        <form action="" onSubmit={submit}>
       <Input type="email" field="email" content='Insert your email here' value={email} onChange={(e) => setEmail(e.target.value)}/>

       <Input type="password" field="password" content='Insert your password here' value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
        <p>Or <Link to="/register">Register</Link></p>
    </div>
}
    