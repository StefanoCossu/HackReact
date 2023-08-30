import { Link } from "react-router-dom"

export default function GenresList({genres,genre}) {
    return  genres.map(el =>{
        return <Link to={`/search/${el.slug}/`} key={el.id} className={el.slug === genre ? "font-bold tracking-widest text-white border-b-2 border-acc" : ""}>
            {el.name}
        </Link>
    })}
