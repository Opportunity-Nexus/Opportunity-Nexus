import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/index";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="relative">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
