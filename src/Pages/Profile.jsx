import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import ProfileAdmin from "../Components/ProfileAdmin";
import ProfileUser from "../Components/ProfileUser";
import useAuthStore from "../store/authStore";



export default function Profile() {

  const {t} = useTranslation()
  
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const username = useAuthStore((state) => state.profile.username)

  return (<>
    <Helmet>
      <title>{t("profile.meta.title")}</title>
    </Helmet>
    <div className="mt-24 min-h-screen px-24">
      <h1 className="text-3xl"> {t('profile.title')} {username ? username : ""}</h1>
      {isAdmin ? <ProfileAdmin /> : <ProfileUser />}
    </div>
    </>
  );
}