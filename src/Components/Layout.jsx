import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/index";

const Layout = () => {
  return (
    <div className="dark:bg-richblack-900">
      <Header className="sticky-header " />
      <div className="min-h-screen mt-14">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
