import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useAuthStore from "../store/authStore";
import Prefered from "../Components/homePage/Prefered";
import HeaderBackground from "../Components/homePage/HeaderBackground";
import NotLogged from "../Components/homePage/NotLogged";



export default function Home() {
  const profile =  useAuthStore((state) => state.profile);
  const {t} = useTranslation();
 
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
      
     <div className="myShadow mt-5 pb-5 mx-10 bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3]">
     {profile && 
      <>
      <div>
        <h2 className="ms-20 pt-10 bg-gradient-to-r from-[#00BECC] to-98% via-[#7E2FE0] bg-clip-text text-4xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 lg:text:5xl md:text:4xl font-title pb-2">
          {t("home.prefered")}
        </h2>
      </div>
      <Prefered/>
      </>
      }
      {!profile &&
        <NotLogged/>
      }
    </div>
    </div> 
    <div className="myBox1 w-[500px] bg-black h-[300px] relative"></div>
    </>
  );
}



