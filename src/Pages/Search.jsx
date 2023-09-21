import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import GenresList from "../Components/GenresList"
import Card from "../Components/Card"
import StoresList from "../Components/StoresList.jsx";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";


export default function SearchTwo() {
  const {t} = useTranslation()
  const { genres, stores } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [num,setNum] = useState(1)

  const [games, setGames] = useState(null);
  const [searched, setSearched] = useState("");

  useEffect(() => {

    const qs = [...searchParams].map((el) => `&${el[0]}=${el[1]}`).join("");

    fetch(
      `${import.meta.env.VITE_RAWG_API_URL}/games?&key=${
        import.meta.env.VITE_RAWG_API_KEY
      }&page_size=${page_size}&search_precise=true&ordering=-rating${qs}`,
    )
      .then((r) => r.json())
      .then((r) => {
        setGames(r);
      });
  }, [searchParams]);



  const page_size = 12;

  const handlePage = (order) => {
    const allParams = Object.fromEntries([...searchParams]);
    setNum(allParams.page)

    if (order === "next") {
      setSearchParams({
        ...allParams,
        page: allParams.page ? +allParams.page + 1 : 2,
      })
      setNum(num+1);
    }else if (order === "end") {
        setSearchParams({
          ...allParams,
          page: allParams.page = 833 ,
        })
        setNum(833);
    }else if (order === "start") {
        setSearchParams({
          ...allParams,
          page: allParams.page = 1 ,
        })
        setNum(1);
    } else {
      setSearchParams({
        ...allParams,
        page: allParams.page == 1 || !allParams.page ? 1 : +allParams.page - 1,
      });
      setNum(num-1)
      
    }
    
  };

  const handleSearched = () => {
    const allParams = Object.fromEntries([...searchParams]);
    setSearchParams({ search: searched });
  };

  return (
    <>
    <Helmet>
      <title>{t("search.meta.title")}</title>
    </Helmet>
    <div className="flex min-h-screen px-6">
      <div className="flex w-1/5 flex-col">
        <div className="mb-12"></div>
        <input
          type="search"
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <button onClick={handleSearched}>ok</button>
        <GenresList
          genres={genres}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <hr className="my-12" />
        <StoresList
          stores={stores}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <div className="w-4/5">
        {games && (
          <>
            <p>{games.count}</p>
            <div className="flex flex-wrap">
              {games.results.map((game) => (
                <Card key={game.id} game={game} />
              ))}
            </div>

            <div className="mb-12 flex w-full justify-center">
            {num > 1 && <button onClick={() => handlePage("start")}>start</button>}
            {num > 1 && <button onClick={() => handlePage("prev")}>prev</button>}
              {/* <button onClick={() => handlePage("prev")}>prev</button> */}
              <span>{searchParams.get("page")}</span>
            { !(num == 833) &&  <button onClick={() => handlePage("next")}>next</button>}
            { !(num == 833) &&  <button onClick={() => handlePage("end")}>end</button>}
             
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}

export const getGenres = async () => {
  return await fetch(
    `${import.meta.env.VITE_RAWG_API_URL}/genres?key=${
      import.meta.env.VITE_RAWG_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => r.results);
};

export const getStores = async () => {
  return await fetch(
    `${import.meta.env.VITE_RAWG_API_URL}/stores?key=${
      import.meta.env.VITE_RAWG_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => r.results);
};

export const loadAll = async () => {
  const genres = await getGenres();
  const stores = await getStores();

  return { genres, stores };
};
