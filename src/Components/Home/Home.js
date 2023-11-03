import React from "react";
import { Outlet } from "react-router-dom";
import Products from "../Products/Products";

const Home = () => {
  return (
    <>
      <Products/>
      <>
        <Outlet />
      </>
    </>
  );
};

export default Home;
