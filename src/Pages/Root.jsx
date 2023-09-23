import { Outlet, ScrollRestoration } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import Authentication from "../Components/Authentication";

export default function Root() {
  return (
    <>
    <ScrollRestoration />
    <Authentication>
      <div className="text-slate-800 bg-cyan-400 dark:text-slate-200 dark:bg-slate-900 min-h-screen antialiased">
      <Navigation />
      <div >
        <Outlet />
      </div>
      <Footer />
    </div>
    </Authentication>
    </>
  );
}
