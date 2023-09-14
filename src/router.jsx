import { createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Search, { getGenres } from "./Pages/Search";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoot";
import SearchTwo, { loadAll } from "./Pages/Searchtwo";
import SignIn from "./Pages/SignIn";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "/search/:genre?/:num?",
        element: <Search />,
        loader: getGenres
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/searchtwo",
        element: <SearchTwo />,
        loader: loadAll,
      },
    ],
  },
]);
