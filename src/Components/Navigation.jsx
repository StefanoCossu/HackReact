import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navigation() {
  return (
    <div>
      <ThemeSwitcher />
      <Link to="/">Home</Link>
    </div>
  );
}
