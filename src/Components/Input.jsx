export default function Input({type,field,value,content,onChange}){
    return (
        <div className="relative z-0 w-full mb-12 group">
            <input 
            type={type} 
            name={field} 
            id={field} 
            value={value} 
            onChange={onChange}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent py-2.5 text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-400 dark:text-white" 
            placeholder="" required/>
            <label htmlFor={field} className="absolute top-3 -z-10 origin-[0] -translate-y-6 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-focus:left-0 peer-focus:-translate-y-6 dark:text-gray-400">{content}</label>
      
    </div>
)}