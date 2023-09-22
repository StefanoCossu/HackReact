import { useEffect, useState } from "react";
import Favorites from "./admin/Favorites";
import Profiles from "./admin/Profiles";
import UpdateImage from "./UpdateImage";
import { supabase } from "../supabase/client";
import { useTranslation } from "react-i18next";

export default function ProfileAdmin() {
    const {t} = useTranslation()
    const [data , setData] = useState(null)
    const getData = async () =>{
      let {data , error} = await supabase.from("favorites").select();
      const favs = [... new Set(data.map((el)=> el.game_name))].map(el =>{
        return{
          id: el,
          label: el,
          value: (data.filter(x => x.game_name === el).length) / data.length
        }
      })
      setData(favs)
    }
    useEffect(()=>{
      getData()
    },[])
    return <>
    <div>{t("profile.welcomeBack")}
    <UpdateImage />
    </div>
    <div>
      <h2 className="my-12 text-2xl">{t("profile.games")}</h2>
      {data && <div className="h-[50vh]">
        <Favorites data={data}/>
      </div>}
      <h2 className="my-12 text-2xl">{t("profile.usersList")}</h2>
      <Profiles />
    </div>
    
    
    </>
    
  }
  