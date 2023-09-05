import { useEffect, useState } from "react"
import { supabase } from "../Supabase/client"
import { useAuth } from "../Contexts/AuthProvider"
import { Await } from "react-router-dom"
import getProfileImage from "../Utilities/getProfileImage"

export default function UpdateImage(){
 
    const {user} = useAuth()
    const [profile,setProfile] = useState(null)
    const [preview,setPreview] = useState()
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState()

    useEffect(()=>{
        const getUserInfo = async () => {
          try {
            let { data, error } = await supabase.from("profiles")
            .select()
            .eq('id', user.id)
            .single();
    
              if (error) throw error;
    
              setProfile(()=> data)
            
          }catch (error) {
            console.log(error);
          }
        }
        if (user) {
          getUserInfo()
        }else{
          setProfile(null)
        }
        
      },[user])

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
        const fileName = `${user.id + Math.random()}.${fileExt}`

        const {error: uploadError} = await supabase.storage.from("avatars").upload(fileName, file);
        if (uploadError) {
            throw uploadError
        }
        const updated_at = new Date()
        const {error} = await supabase.from('profiles').upsert({
            id: user.id,
            updated_at,
            avatar_url: fileName
        })

        const {errorUser} = await supabase.auth.updateUser({
            id: user.id,
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
            {profile && <img src={getProfileImage(profile.avatar_url)} className="w-1/6"/>}
        </div>
        <div>{preview && <img src={preview} className="w-1/6"/>}
        </div>
        <form onSubmit={submit}>
            {uploading ? "Uploading" : "Upload"}
      <input type="file" accept="image/*" disabled={uploading} onChange={handleFile} />
      <button type="submit">Load Image</button>
        </form>


    </div>
)}
