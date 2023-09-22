import { useTranslation } from "react-i18next";
import UpdateImage from "./UpdateImage";
export default function ProfileUser() {
  const {t} = useTranslation()
  return (
    <div>
      {t("profile.welcomeUser")}
      <UpdateImage />
    </div>
  );
}