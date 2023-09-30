import { useState , useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function HeaderBackground(){
    let w = window.innerWidth;
    const {t}= useTranslation()
    const [grid, setGrid] = useState()
    const cols = w > 1024 ? 77 : w > 768 ? 36 : 14
    const rows = w > 1024 ? 20 : w > 768 ? 22 : 15    
    const [load, setLoad] = useState("")
    let counter = 0
    const cycles = 150
    
    const positions = [
        [0,1],
        [0,-1],
        [1,-1],
        [-1,1],
        [1,1],
        [-1,-1],
        [1,0],
        [-1,0],
    ]

    const randomGrid = () =>{
        const grid = []
        for(let i = 0; i < rows; i++){
            const row =[]
            for(let j = 0; j < cols; j++){
                row.push(Math.floor(Math.random()*2))
            }
            grid.push(row)
        }
        return grid
    }
    const runSimulation = ()=>{
      setInterval(()=>{
        if (counter >= cycles) return 
            setGrid((g) => {
                if (counter == cycles) return g
                counter++
                const next = g.map((row,i)=>{
                    return row.map((cell,j)=>{
                        let sum = 0
                        positions.forEach((position)=>{
                            const x = i + position[0]
                            const y = j + position[1]
                            if(x >= 0 && x < rows && y >= 0 && y < cols){
                                sum += g[x][y]
                            }
                        }) 
                        if(sum < 2 || sum >3){
                            return 0
                        }
                        if (sum === 3) {
                            return 1
                        }
                        return g[i][j]               
                    })
                })
                return next   
            })
        }, 800)
    }

    useEffect(()=>{
    setGrid(randomGrid()) 
    setTimeout(()=>{
        setLoad(true)
    },200)
    },[w])

   useEffect(()=>{
        runSimulation()
    },[load])

    return(
        <div className="flex justify-center w-full mb-20 md:mb-20 lg:mb-0">
            <div className="relative flex justify-center flex-wrap lg:w-[1558px] lg:h-[400px] md:w-[1558px] md:h-[500px] w-[460px] h-[300px] mt-20 md:mt-0 myShadow">
            {grid && grid.map((rows, i)=>
            rows.map((col,k)=>(
                <div key={`${i}/${k}/$`} className={`w-[20px] h-[20px] ${grid[i][k] ? "bg-green-200 dark:bg-cyan-600" : ""}  border-[1px] border-grey-500 dark:border-gray-800` }></div>
            )))}
            <div className="w-full absolute md:top-20">

                <div className="title-wrapper -skew-y-6 grid items-center justify-center ">
                    <h1 className="sweet-title">
                        <span className={` before:contents-[${t("home.title")}] mb-5  bg-gradient-to-r from-[#096067] from-98% via-98%  via-[#541c97] to-[#541c97]  bg-clip-text text-transparent dark:from-sky-600 dark:to-sky-100 `}>
                            {t("home.title")}
                        </span>
                        <span className={` before:contents-[${import.meta.env.VITE_PROJECT_NAME}] bg-gradient-to-r from-[#096067] from-98% via-98%  via-[#541c97] to-[#541c97]  bg-clip-text text-transparent dark:from-sky-600 dark:to-sky-100 `}>
                            {import.meta.env.VITE_PROJECT_NAME}
                        </span>
                        <span className={`bottom-title before:contents-[${t("home.subtitle")}]  bg-gradient-to-r from-[#096067] from-98% via-98%  via-[#541c97] to-[#541c97]  bg-clip-text text-transparent dark:from-sky-600 dark:to-sky-100`}>
                        {t("home.subtitle")}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
        </div>
        
    )
}