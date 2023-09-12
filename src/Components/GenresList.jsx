import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

// export default function GenresList({genres,genre}) {
//     return  genres.map(el =>{
//         return <Link to={`/search/${el.slug}/`} key={el.id} className={el.slug === genre ? "font-bold tracking-widest text-white border-b-2 border-acc" : ""}>
//             {el.name}
//         </Link>
//     })}

export default function GenresList({ genres, searchParams, setSearchParams }) {
  const {t} = useTranslation()
        const handleChange = (slug) => {
          const allParams = Object.fromEntries([...searchParams]);
      
          setSearchParams({
            ...allParams,
            genres: slug,
          });
        };
        return (
          <>
            <p className="mb-4 text-xl">{t("search.genres")}</p>
            <div className="h-72 overflow-y-scroll">
              {genres.map((el) => (
                <p
                  onClick={() => handleChange(el.slug)}
                  key={el.id}
                  className={
                    searchParams.get("genres") === el.slug
                      ? "border-b-2 border-accent font-bold tracking-widest cursor-pointer"
                      : "cursor cursor-pointer"
                  }
                >
                  {el.name}
                </p>
              ))}
            </div>
          </>
        );
      }