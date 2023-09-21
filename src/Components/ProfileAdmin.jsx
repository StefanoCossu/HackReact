import { useEffect, useState } from "react";
import Favorites from "./admin/Favorites";
import Profiles from "./admin/Profiles";
import UpdateImage from "./UpdateImage";
import { supabase } from "../supabase/client";
export default function ProfileAdmin() {
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
    <div>Bentornato Admin
    <UpdateImage />
    </div>
    <div>
      <h2 className="my-12 text-2xl">Giochi preferiti:</h2>
      {data && <div className="h-[50vh]">
        <Favorites data={data}/>
      </div>}
      <h2 className="my-12 text-2xl">Lista utenti:</h2>
      <Profiles />
    </div>
    
    
    </>
    
  }
  