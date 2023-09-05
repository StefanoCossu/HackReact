import { useState } from "react";
import { supabase } from "../Supabase/client"
import Input from "../Components/Input";
import { Link, useNavigate } from "react-router-dom";

export default function Register(){

    const [form, setForm] = useState(
        {
            email: "",
            password: "",
            confirm_password:"",
            options:{
                data:{
                    username:"",
                    first_name:"",
                    last_name:"",
                }
            }
        }
    )
    const [message,setMessage] = useState("");
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();

        try{
            const {data,error} = await supabase.auth.signUp(form)
            if(error){
                setMessage(error.message)
            }
            if (data){
                navigate("/profile")
            }
        }catch (error){
           console.log(error);
        }
    }

    return  <div className="lg:w-1/2 mx-auto mt-24 min-h-screen">
    <p className="text-center text-white font-bold text-2xl">Register</p>
    <form onSubmit={submit}>
    <Input type="text" field="username" content="Choose your username" value={form.options.data.username}
    onChange={e => setForm((prev)=> ({...prev, options:{data: {...prev.options.data, username: e.target.value}}}))}/>

    <Input type="text" field="first_name" content="Insert your first_name" value={form.options.data.first_name}
    onChange={e => setForm((prev)=> ({...prev, options:{data: {...prev.options.data, first_name: e.target.value}}}))}/>

    <Input type="text" field="last_name" content="Insert your last_name" value={form.options.data.last_name}
    onChange={e => setForm((prev)=> ({...prev, options:{data: {...prev.options.data, last_name: e.target.value}}}))}/>


    <Input 
    type="email" 
    field="email" 
    content='Insert your email here' 
    value={form.email}
    onChange={(e)=> setForm((prev) => ({...prev, email:e.target.value}))}/>

    <Input 
    type="password" 
    field="password" 
    content='Insert your password here'
    value={form.password} 
    onChange={(e)=> setForm((prev) => ({...prev, password: e.target.value}))}/>

    <Input 
    type="password" 
    field="confirm_password" 
    content='Insert your password here' 
    value={form.confirm_password}
    onChange={(e)=> setForm((prev) => ({ ...prev, confirm_password: e.target.value }))}/>

    <button type="submit">Register</button>
    </form>
    {message && <p className="text-red-500">{message}</p>}
    <p>Or <Link to="/login">Login</Link></p>
    </div>
}