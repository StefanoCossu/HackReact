import { ReactComponent as Light } from "../assets/icons/light.svg";
import { ReactComponent as Dark } from "../assets/icons/dark.svg";
import { useState } from "react";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const changeTheme = () => {
    setIsDark((isDark) => !isDark);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return <span className="cursor-pointer" onClick={changeTheme}>{isDark ? <Light /> : <Dark />}</span>;
}
