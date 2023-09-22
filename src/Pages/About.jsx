import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function About() {
  const {t} = useTranslation()
  return <>
  <Helmet>
      <title>Sign In</title>
    </Helmet>
    <p>About Us</p>
  </>;
}
