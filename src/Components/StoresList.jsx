import { useTranslation } from "react-i18next";

export default function StoresList({ stores, searchParams, setSearchParams }) {
  const {t}=useTranslation();
    const handleChange = (id) => {
      const allParams = Object.fromEntries([...searchParams]);
  
      setSearchParams({
        ...allParams,
        stores: id,
        page: 1
      });
    };
    return (
      <>
        <p className="mb-4 text-xl">{t("search.stores")}</p>
        <div className="h-72">
          {stores.map((el) => (
            <p
              onClick={() => handleChange(el.id)}
              key={el.id}
              className={
                " hover:text-white dark:hover:text-cyan-500 " +
                (+searchParams.get("stores") === el.id
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
  