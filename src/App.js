import React from "react";
import "./App.css"

// Components
import Header from "./Components/Home/Header";
import Footer from "./Components/Home/Footer";
import Home from "./Components/Home/Home";

// React router
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { RouterProvider } from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <Header />
          <Footer />
        </>
      }
    >
      <Route index element={<Home />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
