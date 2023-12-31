import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import GenresList from "../Components/GenresList"
import Card from "../Components/Card"
import StoresList from "../Components/StoresList.jsx";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ReactComponent as Next } from "../assets/icons/next.svg";
import { ReactComponent as Prev } from "../assets/icons/prev.svg";
import { ReactComponent as Init } from "../assets/icons/init.svg";
import { ReactComponent as End } from "../assets/icons/end.svg";
import Button from "../Components/uI/Button";


export default function Search() {
  
  const {t} = useTranslation()
  const { genres, stores } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [num,setNum] = useState(1)

  const [games, setGames] = useState(null);
  const [searched, setSearched] = useState("");

  const searching =(v)=>{
    setSearched(v)
    setNum(1)
  }
  useEffect(() => {

    const qs = [...searchParams].map((el) => `&${el[0]}=${el[1]}`).join("");

    fetch(
      `${import.meta.env.VITE_RAWG_API_URL}/games?&key=${
        import.meta.env.VITE_RAWG_API_KEY
      }&page_size=${page_size}&search_exact=true&ordering=-metacritic${qs}`,
    )
      .then((r) => r.json())
      .then((r) => {
        setGames(r);
      });
  }, [searchParams]);

  const page_size = 8;

  const handlePage = (order) => {
    const allParams = Object.fromEntries([...searchParams]);
    setNum(1)

    if (order === "next") {
      setSearchParams({
        ...allParams,
        page: allParams.page ? +allParams.page + 1 : 2,
      })
      setNum(num+1);
    }else if (order === "end") {
      let end = Math.ceil(games.count/page_size )
      if (end > 1250) {
        end = 1250
      }
        setSearchParams({
          ...allParams,
          page: allParams.page = end,
        })
        setNum(end);
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
    <div className="flex min-h-screen px-6 pt-14">
      <div className="flex w-1/5 flex-col">
        <div className="mb-12"></div>
        <div className="p-5 bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] flex flex-col mb-5">
        <input
          placeholder={t("search.searchBar")}
          type="search"
          value={searched}
          onChange={(e) => searching(e.target.value)}
          className="text-black ps-1"
          />      
        <div className="flex justify-center mt-3">
        <Button onClick={handleSearched} label={"Cerca"} type={"button"} />
        </div>
        </div>
        <div className="bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] flex-col">
        <GenresList
          genres={genres}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          num={setNum}
          />
        <hr className="my-12" />
        <StoresList
          stores={stores}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          num={setNum}
        />

        </div>
        
      </div>
      <div className="w-4/5">
        {games && games.results.length > 0 && (
          
          <>
            <div className="grid grid-cols-4 grid-rows-2 gap-4">
              {games.results.map((game) => (
                <Card key={game.id} game={game} />
              ))}
            </div>
            {num > 0 &&
            <div className="mb-12 flex w-full justify-evenly mt-10">
            <div>
            {num > 1 && 
            <Button onClick={() => handlePage("start")} label={<Init />} type={"button"}/>}
            </div>
            <div>
            {num > 1 && <Button onClick={() => handlePage("prev")} label={<Prev />} type={"button"}/>}
            </div>
              <div className="">{searchParams.get("page")}</div>
            <div>
            { (num != 1250 && num != Math.ceil(games.count / page_size)) &&  <Button onClick={() => handlePage("next")} label={<Next />} type={"button"}/>}
            </div>
            <div>
            { (num != 1250 && num != Math.ceil(games.count / page_size)) &&  <Button onClick={() => handlePage("end")} label={<End />} type={"button"}/>}
            </div>
            
          </div>
            }
            
          </>
        )}
        {games && games.results.length === 0 && (
          <div className="h-full flex justify-center items-center">
            <h3>Non ci sono giochi corrispondenti</h3>
          </div>
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
