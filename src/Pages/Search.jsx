import { useEffect, useState } from "react"
import { Link, useLoaderData, useParams } from "react-router-dom"
import GenresList from "../Components/GenresList"
import Card from "../Components/Card"

export default function Search(){

    const genres = useLoaderData()
    const {genre} = useParams()
    const {num = 1} = useParams()

    const [games, setGames] = useState(null)
    const [searched, setSearched] = useState("");
    const [loading, setLoading] = useState(true);

    const page_size = 12

    useEffect(()=>{
        setLoading(true);
        setGames(null);
        setSearched("");
        fetch(`${import.meta.env.VITE_RAWG_API_URL}/games?&key=${import.meta.env.VITE_RAWG_API_KEY}&genres=${genre}&page=${num}&page_size=${page_size}&ordering=-rating`)
        .then(r=>r.json())
        .then(r=>{
            setGames(r);
            setLoading(false);
        })

    },[genre,num])

const triggerSearch = () => {
    setLoading(true);
    setGames(null);
    fetch(`${import.meta.env.VITE_RAWG_API_URL}/games?&key=${import.meta.env.VITE_RAWG_API_KEY}&page_size=12&search=${searched}&search_precise=true`)
    .then((r)=>r.json())
    .then((r)=>{
        setGames(r);
        setLoading(false);
    })
}
    // useEffect(()=>{
    //     if(searched.length > 4){
    //         setLoading(true);
    //         setGames(null);
    //         fetch(`${import.meta.env.VITE_RAWG_API_URL}/games?&key=${import.meta.env.VITE_RAWG_API_KEY}&page_size=12&search=${searched}&search_precise=true`)
    //         .then((r)=>r.json())
    //         .then((r)=>{
    //             setGames(r);
    //             setLoading(false);
    //         })
    //     }
    // },[searched])
    return <div className="px-6 min-h-screen flex">
        <div className="w-1/5 flex flex-col">
        <div className="mb-10">
            <input type="text" className="border-bottom border-b-2 border-acc bg-transparent text-slate-700 dark:text-white" placeholder="Search by name.." value={searched} onChange={(e)=> setSearched(e.target.value)}/>
            <button onClick={triggerSearch} className="bg-transparent">Search</button>
        </div>
            <GenresList genres={genres} genre={genre} />
        </div>
        <div className="w-4/5">
        {games && (
                <>
                <div className="grid grid-cols-4 grid-rows-3 gap-0">
                    {games.results.map((game) =>{
                        return <Card key={game.id} game={game}/>
                    })}
                </div>
                <div className="w-full mb-12">
                    {!searched && 
                    <div className="flex justify-center">
                        <div className="w-48 text center">
                        {num != 1 && <Link to={`/search/${genre}/1`} className="text-slate-800 dark:text-white">
                                Start
                            </Link>}
                        </div>
                        
                        <div className="w-48 text center">
                            {num > 1 && <Link to={`/search/${genre}/${+num -1}`} className="text-slate-800 dark:text-white">
                                Prev
                            </Link>}
                        </div>
                        <div className="w-48 text center">{num}</div>
                        <div className="w-48 text center">
                            {
                                !(num == 833) &&
                                <Link to={`/search/${genre}/${+num +1}`} className="text-slate-800 dark:text-white">
                                Next
                            </Link>
                            }       
                        </div>
                        <div className="w-48 text center">
                        {
                                !(num == 833) &&
                                <Link to={`/search/${genre}/833`} className="text-slate-800 dark:text-white">
                                End
                            </Link>
                        }   
                        </div>
                    </div>
                    }
                </div>
                </>
                )
        }  
        {
            loading && (
                <div className="flex h-full items-center justify-center">loader</div>
            )
        } 
        </div>
   
    </div>
}

export const getGenres = async () =>{
    return await fetch(`${import.meta.env.VITE_RAWG_API_URL}/genres?key=${import.meta.env.VITE_RAWG_API_KEY}`)
    .then((r)=>r.json())
    .then((r)=>r.results)
}