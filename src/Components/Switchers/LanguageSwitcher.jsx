import { useTranslation } from "react-i18next"
import { LANGUAGES } from "../../constants"

export default function LanguageSwitcher(){
   const {i18n} = useTranslation(); 

    const change = (code) => {
        i18n.changeLanguage(code);
    }

    return <div className="flex">
        {
            LANGUAGES.map(el => <span className={"cursor-pointer mx-2" + (el.code === i18n.resolvedLanguage ? "font-bold uppercase" : "")} onClick={()=>change(el.code)} key={el.code}>{el.code}</span> )
        }
    </div>
}