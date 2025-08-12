import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> }, // catch-all route
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
