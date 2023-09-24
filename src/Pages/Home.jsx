import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useAuthStore from "../store/authStore";
import Card from "../Components/Card";


export default function Home() {
  const profile =  useAuthStore((state) => state.profile);
  const {t} = useTranslation();
  const [data, setData] = useState(null)
  const [game,setGame] = useState(null)
  const [loader,setLoader] = useState(false)
  let list = []
  const getPrefered = (params)=>{
      params.favorites.map(el => {
      list.push(el.game_id)
    })
    
    return list
  }
  const getGameS = (params)=>{
    let pref = []
    getPrefered(params)
      list.forEach(el => {
      fetch(`${import.meta.env.VITE_RAWG_API_URL}/games/${el}?&key=${
          import.meta.env.VITE_RAWG_API_KEY}`)
      .then((r) => r.json()).then((r) => pref.push(r));
      })

     return  pref
  }
  
  useEffect (()=>{
   
          if (profile) {
            setGame(getGameS(profile))
            console.log(game);
            console.log(profile); 
            
          }else{
            setTimeout(() => {
              setLoader(!loader)
              console.log("qui");
            }, 1000);
            }
  },[loader])

  useEffect(()=>{
      if (game) {
        setData(game)
        console.log(data);
        console.log(game);
      }else{
        setTimeout(() => {
          setLoader(!loader)
          console.log("qui");
        }, 1000);
        
      }
  
  },[loader])
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
       <h2 className="text-2xl mb-20 text-center font-extrabold font-title">
       I tuoi giochi preferiti:
     </h2>
      <div className="mb-10 mx-10 grid grid-cols-4 grid-rows-2 gap-4">
          {data && data.map((el, index) =>{
            if (index > 7) return
            return <Card key={el.id} game={el} />
          })
          }
      </div>
      {!data &&
          <p className="text-center font-bold">Non hai giochi preferiti</p>}
      </>
      }
    </div> 
    </>
  );
}



