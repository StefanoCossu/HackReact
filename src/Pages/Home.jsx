import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useAuthStore from "../store/authStore";
import Prefered from "../Components/homePage/Prefered";
import HeaderBackground from "../Components/homePage/HeaderBackground";
import NotLogged from "../Components/homePage/NotLogged";
import TopRated from "../Components/homePage/TopRated";
import { useEffect, useState } from "react";



export default function Home() {
  const profile =  useAuthStore((state) => state.profile);
  const {t} = useTranslation();
  const [scrollTop, setScrollTop] = useState(0);
  const [is_viewed,setIs_viewed] = useState()

  useEffect(() => {
      const handleScroll = (event) => {
        setScrollTop(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
      
    }, []);
  
    useEffect(()=>{
 
      if (scrollTop >= 100) {
        setIs_viewed(true)
      }
  
  },[scrollTop])

  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <div className="py-10 mb-10">
      <div className="gap-12 px-12 py-12 md:py-24 md:flex">
        <div className="w-full">
        <HeaderBackground />
        </div>
      </div>
      
     <div className={`${ is_viewed ? "sectionLeft" : "opacity-0"} relative myShadow mt-5 pb-5 mx-10 bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3]`}>
     {profile && 
      <>
      <div>

      <div className="title-wrapper mb-5 grid items-center justify-start">
          <div className="sweet-title">
              <span className={`bottom-title before:contents-[{t("home.prefered")}]  bg-gradient-to-r from-[#096067] from-98% via-98%  via-[#541c97] to-[#541c97]  bg-clip-text text-transparent`}>
                <h2 className="-skew-x-12">{t("home.prefered")}</h2> 
              </span>
            </div>
      </div>
      </div>
      <Prefered/>
      </>
      }
      {!profile &&
        <NotLogged/>
      }
    </div>
    <TopRated/>
    </div> 
    </>
  );
}



