import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";

export default function Root() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
