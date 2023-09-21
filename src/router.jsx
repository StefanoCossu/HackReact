import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search, { getGenres } from "./pages/Search";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoot";
import SearchTwo, { loadAll } from "./pages/Searchtwo";
import SignIn from "./pages/SignIn";
import GameDetails, { getGameDetails } from "./pages/GameDetail";


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
      {
        path: "/game/:id",
        element: <GameDetails />,
        loader: getGameDetails,
      },
    ],
  },
]);
