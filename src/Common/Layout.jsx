import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Home/Header";

const Layout = () => {
	return (
		<div className="dark:bg-richblack-900">
			<Header className="sticky-header " />
			<div className="min-h-screen mt-8">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
