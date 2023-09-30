import useAuthStore from "../../store/authStore";
import { useTranslation } from "react-i18next";
import Carousel from "../uI/Carousel";
import { Link } from "react-router-dom";
import Button from "../uI/Button";
export default function Prefered(){
    const profile =  useAuthStore((state) => state.profile);
    const {t} = useTranslation();


    return <><div className={`mx-10 pt-5 pb-5 my-10 myShadow relative`}>
    {profile.favorites && profile.favorites.length > 0 && 
    <Carousel slide={profile.favorites} />
    }
    {profile.favorites && profile.favorites.length === 0 &&
    <div className="flex justify-center items-center h-full">
        <div className="md:w-1/2 w-full justify-center flex items-center h-[300px]">
            <h3 className="text-center font-semibold font-title text-4xl px-5 bg-gradient-to-r from-[#00BECC] from-40% via-90%  via-[#b094d3] to-[#b499d4] text-transparent  bg-clip-text">Non hai nessun gioco preferito, vai su cerca e selezionali per essere rapidamente connesso con gli altri giocatori</h3>
        </div>
        <div className="flex flex-col justify-center items-center md:w-1/2 w-full h-[300px]">
            <h2 className="mb-5 font-bold text-2xl bg-gradient-to-r from-[#00BECC] from-40% via-90%  via-[#b094d3] to-[#b499d4] text-transparent bg-clip-text">Vai su Cerca!</h2>
            <Link to={'/search'}><Button label={"Cerca"}/></Link>
        </div>
    </div>
    }
</div>
 
</>
}
