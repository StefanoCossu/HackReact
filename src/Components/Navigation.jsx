import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import { ReactComponent as Hamburger } from "../assets/icons/hamburger.svg";
import { ReactComponent as User } from "../assets/icons/user.svg";
import ThemeSwitcher from "./ThemeSwitcher";
import { supabase } from "../Supabase/client";
import useAuthStore from "../Store/authStore";

export default function Navigation() {
  const navigate = useNavigate()
  const [open,setOpen]= useState(false)
  const signOut = useAuthStore((state) => state.setLoggedOut)
  const profile = useAuthStore((state) => state.profile)

  const logOut = () => async () => {
    try{
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      signOut();
      navigate("/");
    }catch(error){
      console.log(error);
    }
  };
  return (
    <nav>
    <div className="fixed z-30 flex h-12 w-screen items-center bg-gradient-to-r from-[#14496c] from-20% via-[#14496cb3] via-90% to-[#14496cb3] px-2 after:absolute after:bottom-[-1px] after:left-[77px] after:h-[1px] after:w-full after:bg-cyan-400 after:content-['']">
      <div className={
        "after:border-r-6 after:animate-flash fixed left-0 top-[19px] z-[-1] h-[44px] w-[60px] border-b-2 border-cyan-400 bg-[#14496c] before:absolute before:bottom-[1px] before:right-[-8px] before:z-[0] before:h-[14px] before:w-[18px] before:skew-x-[-50deg] before:bg-[#11496c] before:content-[''] after:absolute after:bottom-[-2px] after:right-[-10px] after:h-[15px] after:w-[6px] after:skew-x-[-50deg] after:bg-white after:content-['']"
        }
        ></div>
        <div className="text-white flex justify-between md:w-1/2 w-2/3 font-title">
          <Link to="/" className="font-bold tracking-widest font-title">Gamers&apos; Home</Link>
          {/* <Link to="/search" className="hidden md:inline font-title">Search</Link> */}
          <Link to="/searchtwo" className="hidden md:inline font-title">Search</Link>
          <Link to="/" className="hidden md:inline font-title">Home</Link>
          {profile &&
          <Link to="/profile" className="hidden md:inline font-title">{profile && profile.username}</Link>
          }
          {!profile &&
          <Link to="/register" className="hidden md:inline font-title">Registrati</Link>
          }
        </div>
        <div className="flex items-center justify-end w-1/2 text-white">
         
          {profile ?
          <button onClick={logOut()}>Logout</button>
          :
          <Link to="/login" className="ml-3 mr-4">
            <User />
          </Link>
          } 
           <ThemeSwitcher />
          
            <button className="ml-4 md:hidden" onClick={()=> setOpen(!open)}>
             <Hamburger />
            </button>
        </div> 
    </div>
    <div className={"bg-gray-300 dark:bg-sky-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm fixed right-0 z-20 h-screen p-4 overflow-y-auto transition-transform w-full pt-20 flex flex-col md:hidden " + ( open ? "" : "translate-x-full")}>
        <Link to="/" className="font-title py-10">Home</Link>
        <Link to="/searchtwo" className="font-title py-10">Search</Link>
        {profile &&
          <Link to="/profile" className="font-title py-10">{profile && profile.username}</Link>
          }
          {!profile &&
          <Link to="/register" className="font-title py-10">Registrati</Link>
          }
    </div>
    </nav>
  );
}
