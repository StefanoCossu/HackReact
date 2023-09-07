import { useEffect, useState } from "react"
import { supabase } from "../Supabase/client"
import getProfileImage from "../Utilities/getProfileImage"
import useAuthStore from "../Store/authStore"

export default function UpdateImage(){
 
    const profile = useAuthStore((state) => state.profile)

    const [preview,setPreview] = useState()
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState();

      useEffect(()=>{
        if(!file){
            setPreview(null)
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
      },[file])

      const handleFile = (e) => {
        if(!e.target.files){
            setFile(()=> null)
            return
        }
        setFile(()=> e.target.files[0])
      }
      const submit = async (e) => {
        e.preventDefault();
        setUploading(() => true);

        const fileExt = file.name.split(".").pop()
        const fileName = `${profile.id + Math.random()}.${fileExt}`

        const {error: uploadError} = await supabase.storage.from("avatars").upload(fileName, file);
        if (uploadError) {
            throw uploadError
        }
        const updated_at = new Date()
        const {error} = await supabase.from('profiles').upsert({
            id: profile.id,
            updated_at,
            avatar_url: fileName
        })

        const {errorUser} = await supabase.auth.updateUser({
            id: profile.id,
            updated_at,
        })
        if(error || errorUser){
            alert("Errore nel caricamento immagine")
        }else{
            setUploading(() => false) 
            setFile(() => null)
            setPreview(() => null)
        }

        
      }
      
    return (<div>
        <div>
            {profile && <img src={getProfileImage(profile.avatar_url)} className="md:w-1/6 mb-5"/>}
        </div>
        <div>{preview && <img src={preview} className="md:w-1/6 mb-5"/>}
        </div>
        <form onSubmit={submit}>
            {uploading ? "Uploading  " : "Upload "}
            {file ? <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Cambia immagine</button> : 
            <>
            <label htmlFor="button" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Scegli immagine</label>
            <input type="file" className="hidden" id="button" accept="image/*" disabled={uploading} onChange={handleFile} /></>
             }
      {/* <input type="file" accept="image/*" disabled={uploading} onChange={handleFile} />
      <button type="submit">Load Image</button> */}
        </form>


    </div>
)}
