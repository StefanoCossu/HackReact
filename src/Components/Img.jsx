import useAuthStore from "../store/authStore";
import getProfileImage from "../utilities/getProfileImage"

export default function Img(){
    const profile = useAuthStore((state) => state.profile)
    
    return <img src={getProfileImage(profile.avatar_url)}  
    className={"md:w-1/6 mb-5"}
    />
}