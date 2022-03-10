import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>Escortee Web</nav>
      <Outlet />
    </>
  );
};

export default Layout;
