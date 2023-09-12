import { Link } from "react-router-dom";
import LanguageSwitcher from "./Switchers/LanguageSwitcher";
import { useTranslation } from "react-i18next";


export default function Footer() {
  
  const {t} = useTranslation();
  
  return (
    <footer className="p-4 bg-gradient-to-r from-[#14496c] to-[#14496cb3] w-full bottom-0 border-t border-acc text-white flex justify-between">
      <ul className="flex items-center">
      <Link to="/about-us" className="md:mr-12 mr-4">{t("footer.about")}</Link>
      <Link to="/about-us" className="md:mr-12 mr-4">{t("footer.stack")}</Link>
      <Link to="/about-us" className="md:mr-12 mr-4">{t("footer.contact")}</Link>
      <Link to="/about-us" className="md:mr-12 mr-4">{t("footer.privacy")}</Link>
      </ul>
      <div className="flex">
      <LanguageSwitcher />
      </div>
    </footer>
  );
}
