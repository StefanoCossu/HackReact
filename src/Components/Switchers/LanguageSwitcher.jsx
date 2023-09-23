import { useTranslation } from "react-i18next"
import { LANGUAGES } from "../../constants"

export default function LanguageSwitcher(){
   const {i18n} = useTranslation(); 

    const change = (code) => {
        i18n.changeLanguage(code);
    }

    return <div className="flex mx-2">
        {
            LANGUAGES.map(el => <span className={"cursor-pointer" } onClick={()=>change(el.code)} key={el.code}><span className={(el.code === "en" ? "fi fi-gb " : "fi fi-it") + (el.code === i18n.resolvedLanguage ? "hidden absolute" : "") }></span> </span> )
        }
    </div>
}