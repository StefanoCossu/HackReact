import { useEffect, useState } from "react"
import { supabase } from "../../supabase/client"
import BanUser from "./BanUser"
import Button from "../uI/Button"

export default function Profiles(){
    const [data, setData] = useState()
    const [page, setPage] = useState(0)
    const [checker,setChecker]=useState(true)
    const [counter,setCounter]=useState(0)
    const num = 10
   
    const getCount = async () => {
    let count = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    return setCounter(count.count)
    
    }
    

    const getData = async () => {
        let {data} = await supabase.from("profiles").select().range(num * page, page * num + num-1).order("id",{ascending: true});
        const headers = [
            "Id","Usename","Firstname","Lastname","Banned until",
        ];
        
        const entries =  data.map((el) => [
            el.id, 
            el.username, 
            el.first_name, 
            el.last_name, 
            <BanUser key={el.id} user={el.id} banned={el.banned_until} getData={getData} />,
    ])
    setData({
        headers,entries,
    });
    };
    useEffect(()=>{
        getCount()
        if (counter &&((counter/((page+1)*num))> 1)) {
            setChecker(true)
        }else{
            setChecker(false)
        }
    },[counter])
    useEffect(() => {     
        getData() 
        if (counter &&((counter/((page+1)*num))> 1)) {
            setChecker(true)
        }else{
            setChecker(false)
        }
    },[page])
    return <div>
        {data ? (
        <div className="my-5 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {data.headers.map((el,_) =>(
                            <th key={_} scope="col" className="px-6 py-3">
                                {el}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.entries.map((el,_)=>(
                        <tr key={"tr"+ _}
                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                            {el.map((x, _) => (
                                <td key={"td" + _} scope="col" className="px-6 py-3">
                                    {x}
                                </td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>) : ("loading")}
        <div className="flex justify-around mb-10">
            <div>
            {page > 0 && 
            (<Button label={"prev"} onClick={() => setPage((prev) => prev - 1)} type={"button"}/>)}
            </div>
            <div>
            {checker && 
                <Button label={"next"} onClick={() => setPage((prev) => prev + 1)} type={"button"}/>
            }
            </div>
        </div>
    </div>
}