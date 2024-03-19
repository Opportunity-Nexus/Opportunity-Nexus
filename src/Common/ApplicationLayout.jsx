import ApplicationLayoutSidebar from "./ApplicationSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const ApplicationLayout = () => {
  return (
    <div className="root">
      <div id="layout-mid-container" className=" relative flex flex-1">
        <div
          id="layout-sidebar-desktop-container"
          className=" w-full overflow-y-hidden relative min-h-screen bg-white dark:bg-gray-900"
        >
          <ApplicationLayoutSidebar />
          <div className="min-h-screen md:pl-64">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationLayout;
