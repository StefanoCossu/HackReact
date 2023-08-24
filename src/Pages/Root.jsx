import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";

export default function Root() {
  return (
    <div className="text-slate-800 bg-cyan-400 dark:text-slate-200 dark:bg-slate-900 min-h-screen antialiased">
      <Navigation />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
