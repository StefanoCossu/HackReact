import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useAuthStore from "../store/authStore";
import Prefered from "../Components/Prefered";
import HeaderBackground from "../Components/header/HeaderBackground";



export default function Home() {
  const profile =  useAuthStore((state) => state.profile);
  const {t} = useTranslation();
 
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <div className="min-h-screen">
      <div className="gap-12 px-12 py-12 md:py-24 md:flex">
        <div className="w-full">
        <HeaderBackground />
        </div>
      </div>
      {profile && 
      <>
       <h2 className="ms-20 bg-gradient-to-r from-[#00BECC] to-98% via-[#7E2FE0] bg-clip-text text-4xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 lg:text:5xl md:text:4xl font-title pb-6">
       {t("home.prefered")}
     </h2>
     <div className="w-full">
     <Prefered/>
     </div>
      
      </>
      }
    </div> 
    </>
  );
}



