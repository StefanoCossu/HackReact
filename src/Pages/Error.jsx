import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function Error() {
  const {t} = useTranslation()
  return<>
  <Helmet>
      <title>Error</title>
    </Helmet>
    <div className="pt-20 flex justify-center">
    <p>Si è verificato un errore!</p>;
    </div>
  
  </> 
  
}
