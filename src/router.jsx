import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoot";
import Search, { loadAll } from "./pages/Search";
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
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/search",
        element: <Search />,
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
