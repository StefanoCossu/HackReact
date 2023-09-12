import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const index = "http://localhost:5173"
i18next.use(LanguageDetector).use(I18NextHttpBackend).use(initReactI18next).init({
    fallbackLng: "en",
    backend:{
        loadPath: `${index}/locales/{{lng}}.json`,
    }
})

export default i18next