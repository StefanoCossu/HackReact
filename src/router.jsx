import { createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Error from "./Pages/Error";

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
    ],
  },
]);
