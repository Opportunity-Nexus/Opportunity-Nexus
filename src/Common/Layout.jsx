import React, { useEffect, useState } from "react";
import ApplicationLayout from "./ApplicationLayout";
import StandardLayout from "./StandardLayout";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";




const Layout = () => {

	const { token } = useSelector((state) => state.auth);
	const location = useLocation();
	const pathName = location.pathname;

	console.log('pathname',pathName);

	if( token && pathName === '/dashboard' || pathName === '/dashboard/' ) {
		return <ApplicationLayout />
	}
	else {
		return <StandardLayout />
	}
}

export default Layout;
