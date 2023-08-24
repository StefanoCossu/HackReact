import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null)
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_RAWG_API_URL}?dates=2023-07-24,2023-08-24&ordering=-added&key=${import.meta.env.VITE_RAWG_API_KEY}`)
    .then((r) => r.json()).then((r) => setData(r.results))
  },[])
  return (
    <div className="min-h-screen">
      <div className="gap-12 px-12 py-12 md:py-24 md:flex">
        <div className="w-full md:w-2/5">
          <h1 className="bg-gradient-to-r from-primary to-98% via-acc bg-clip-text text-4xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 lg:text:6xl font-title pb-12">
            {import.meta.env.VITE_PROJECT_NAME}
          </h1>
          <p className="bg-gradient-to-r from-primary to-98% via-acc bg-clip-text text-3xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 lg:text:5xl font-title">
            Lorem, ipsum dolor lorem lorem loremlorem
          </p>
        </div>
      </div>
      <div className="mb-10 md:ms-20 grid grid-cols-5 grid-rows-4 gap-4">
          {data && data.map(el =>{
            return <div key={el.id}>
              <p>{el.name}</p>
              <img src={el.background_image} className="w-40 h-40 object-cover rounded-full" alt={el.game} />
              </div>
          })}
      </div>
    </div>
  );
}
