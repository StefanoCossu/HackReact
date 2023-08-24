import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="p-4 bg-gradient-to-r from-[#14496c] to-[#14496cb3] w-full bottom-0 border-t border-acc text-white flex justify-between">
      <ul className="flex items-center">
      <Link to="/about-us" className="md:mr-12 mr-4">About us</Link>
      <Link to="/about-us" className="md:mr-12 mr-4">Stack</Link>
      <Link to="/about-us" className="md:mr-12 mr-4">Contact us</Link>
      <Link to="/about-us" className="md:mr-12 mr-4">Privacy</Link>
      </ul>
      <div className="flex">
        <span className="mx-4 cursor-pointer">EN</span>
        <span className="mx-4 cursor-pointer bold">IT</span>
      </div>
    </footer>
  );
}
