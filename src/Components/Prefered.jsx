import useAuthStore from "../store/authStore";
import { useTranslation } from "react-i18next";
import Carousel from "./uI/Carousel";

export default function Prefered(){
    const profile =  useAuthStore((state) => state.profile);
    const {t} = useTranslation();


    return <><div className="mx-10 pt-16 pb-10 shadow">
    {profile.favorites && 
    <Carousel slide={profile.favorites} />
    }
</div>
 {!profile.favorites &&
    <p className="text-center font-bold">{t("home.games")}</p>}
</>
}
