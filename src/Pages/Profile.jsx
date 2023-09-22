import { Helmet } from "react-helmet-async";
import ProfileAdmin from "../Components/ProfileAdmin";
import ProfileUser from "../Components/ProfileUser";
import useAuthStore from "../store/authStore";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const {t} = useTranslation()
  
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const username = useAuthStore((state) => state.profile.username)

  return (<>
    <Helmet>
      <title>Profile</title>
    </Helmet>
    <div className="mt-24 min-h-screen px-24">
      <h1 className="text-3xl">Benvenuto nel tuo profilo {username ? username : ""}</h1>
      {isAdmin ? <ProfileAdmin /> : <ProfileUser />}
    </div>
    </>
  );
}