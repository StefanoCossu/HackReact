export default function getProfileImage(url){
    
    if(!url) return "https://picsum.photos/100"

    return `${import.meta.env.VITE_SUPABASE_PROJECT_URL}/storage/v1/object/public/avatars/${url}`
}