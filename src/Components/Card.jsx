export default function Card({game}){
    return <div className="mb-5 mx-1 justify-center text-white bg-secondary">
        <p className="h-10 mb-5 mt-5 ms-1">{game.name}</p>
        <img src={game.background_image} className="w-full object-cover h-40 mb-2" alt={game.name} />
    </div>
}