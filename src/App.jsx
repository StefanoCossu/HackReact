// import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import { Helmet, HelmetProvider } from "react-helmet-async";
function App() {
  
  return <HelmetProvider>
    <Helmet>
      <title>Titolo</title>
    </Helmet>
    <RouterProvider router={router} />
  </HelmetProvider>;
}

export default App;
