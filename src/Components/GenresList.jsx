import { useTranslation } from "react-i18next";

export default function GenresList({ genres, searchParams, setSearchParams, num}) {
  const {t} = useTranslation()
        const handleChange = (slug) => {
          const allParams = Object.fromEntries([...searchParams]);
          setSearchParams({
            ...allParams,
            genres: slug,
            page: 1
          });
          num(1)
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
                    " hover:text-white dark:hover:text-cyan-500 " +
                    (searchParams.get("genres") === el.slug
                      ? "border-b-2 border-accent font-bold tracking-widest cursor-pointer"
                      : "cursor cursor-pointer")
                  }
                >
                  {el.name}
                </p>
              ))}
            </div>
          </>
        );
      }