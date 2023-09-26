import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useAuthStore from "../store/authStore";
import Prefereds from "../Components/prefered";


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
          <h1 className="text-center bg-gradient-to-r from-primary to-98% via-acc bg-clip-text text-4xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 lg:text:6xl md:text:5xl font-title py-12">
          {t("home.title")} {import.meta.env.VITE_PROJECT_NAME}
          </h1>
          <p className="text-center bg-gradient-to-r from-primary to-98% via-acc bg-clip-text text-3xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 lg:text:5xl md:text:4xl font-title pb-12">
            {t("home.subtitle")}
          </p>
        </div>
      </div>
      {profile && 
      <>
       <h2 className="text-2xl text-center font-extrabold font-title">
       {t("home.prefered")}
     </h2>
     <div className="w-full">
     <Prefereds/>
     </div>
      
      </>
      }
    </div> 
    </>
  );
}



