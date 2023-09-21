import ProfileAdmin from "../Components/ProfileAdmin";
import ProfileUser from "../Components/ProfileUser";
import useAuthStore from "../store/authStore";

export default function Profile() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const username = useAuthStore((state) => state.profile.username)

  return (
    <div className="mt-24 min-h-screen px-24">
      <h1 className="text-3xl">Benvenuto nel tuo profilo {username ? username : ""}</h1>
      {isAdmin ? <ProfileAdmin /> : <ProfileUser />}
    </div>
  );
}