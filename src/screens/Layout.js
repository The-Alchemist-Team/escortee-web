import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>HIda</nav>
      <Outlet />
    </>
  );
};

export default Layout;
