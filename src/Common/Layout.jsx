import React, { useEffect, useState } from "react";
import ApplicationLayout from "./ApplicationLayout";
import StandardLayout from "./StandardLayout";
import { useSelector } from "react-redux";




const Layout = () => {

	const { token } = useSelector((state) => state.auth);
	const pathName = window.location.pathname;
	console.log('pathname',pathName);

	if( token && pathName !== '/') {
		return <ApplicationLayout />
	}
	else {
		return <StandardLayout />
	}
}

export default Layout;
