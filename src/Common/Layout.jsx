import React, { useEffect, useState } from "react";
import ApplicationLayout from "./application-layout";
import StandardLayout from "./standard-layout";
import { useSelector } from "react-redux";


const Layout = () => {

	const { token } = useSelector((state) => state.auth);

	if( token ) {
		return <ApplicationLayout />
	}
	else {
		return <StandardLayout />
	}
}

export default Layout;
