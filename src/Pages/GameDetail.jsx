import { useLoaderData } from "react-router-dom";
import useAuthStore from "../store/authStore";
import GameChat from "../Components/GameChat";
import { supabase } from "../supabase/client";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function GameDetails() {
  const {t} = useTranslation()
  const game = useLoaderData();
  const profile = useAuthStore((state) => state.profile);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const isFavorite = () => {
    return profile.favorites.find((el) => +el.game_id === game.id);
  };

  const toggleFavorite = async () => {
    const data = await supabase.auth.getSession();
    if (isFavorite()) {
      const { data, error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", isFavorite().id);
      
    } else {
      const { data, error } = await supabase
        .from("favorites")
        .insert({ user_id: profile.id, game_id: game.id, game_name: game.name ,game_image:game.background_image })
        .select();
    
    }

    setLoggedIn(data.data.session);
  };

  return (
    <>
    <Helmet>
      <title>Detail {game.name}</title>
    </Helmet>
    <div
      className="min-h-screen px-12 py-24"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,1)), url("${game.background_image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex text-white">
        <div className="w-1/2">
          <p className="font-main  bg-gradient-to-r  from-sky-600 to-sky-100 bg-clip-text pb-4 text-3xl font-extrabold text-transparent md:text-5xl ">
            {game.name}
          </p>

          {profile && (
            <div className="my-12">
              <svg className={isFavorite() ? "fill-red-500 stroke-red-500 dark:stroke-red-500 dark:fill-red-500" : "fill-gray-400 stroke-gray-400 dark:stroke-gray-500 dark:fill-gray-500"} strokeWidth={1.5}
                 height="1em" viewBox="0 0 512 512"
                 onClick={()=>toggleFavorite()}>
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                    </svg>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
        </div>

        <div className="w-1/2">{profile && <GameChat game={game.id} />}</div>
      </div>
    </div>
    </>
  );
}

export const getGameDetails = async ({ params }) => {
  return await fetch(
    `${import.meta.env.VITE_RAWG_API_URL}/games/${params.id}?key=${
      import.meta.env.VITE_RAWG_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => {
      return r;
    });
};
