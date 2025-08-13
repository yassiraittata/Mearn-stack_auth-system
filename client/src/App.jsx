import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { AppContextProvider } from "./context/AppContextProvider.jsx";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/email-verify", element: <EmailVerify /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <NotFound /> }, // catch-all route
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />;
    </>
  );
};

export default App;
