import { Outlet, ScrollRestoration } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import Authentication from "../Components/Authentication";

export default function Root() {
  return (
    <>
    <ScrollRestoration getKey={(location, matches) => {
    const paths = ["/search"];
    return paths.includes(location.pathname)
      ? 
        location.pathname
      : 
        location.key;}}/>
    <Authentication>
      <div className="text-slate-800 dark:bg-slate-900 dark:text-slate-200 min-h-screen antialiased">
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
