import ProfileAdmin from "../Components/ProfileAdmin";
import ProfileUser from "../Components/ProfileUser";
import { useAuth } from "../Contexts/AuthProvider";
import useProfile from "../Utilities/useProfile";

export default function Profile() {
  const { user } = useAuth();
    const profile = useProfile()

    console.clear()
    console.log(profile);

  return (
    <div className="mt-24 min-h-screen px-24">
      <h1 className="text-3xl">Benvenuto nel tuo profilo {profile ? profile.username : ""}</h1>
      {user.app_metadata.claims_admin ? <ProfileAdmin /> : <ProfileUser />}
    </div>
  );
}