import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import Store from "./Redux/Store";
import { Provider } from "react-redux";
import "./global.css";
import Layout from "./Common/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import ForgetPass from "./Pages/Authentication/ForgetPass";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import Opportunities, {
	loader as OpportunitiesLoader,
} from "./Pages/Opportunities/Opportunities";
import Error from "./Components/Opportunities/Error";
import Dashboard from "./Pages/Dashboard/Dashboard";

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import UpdatePassword from "./Pages/Authentication/UpdatePassword";
const themes = {
	light: "public/light.css",
	dark: "public/dark.css",
};

function App() {
	const routes = [
		<Route element={<Layout />}>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/ForgetPass" element={<ForgetPass />} />
			<Route path="/update-password/:id" element={<UpdatePassword />} />
			<Route
				path="/opportunities/:id"
				element={<Opportunities />}
				loader={OpportunitiesLoader}
				errorElement={<Error />}
			/>
			<Route path="/dashboard" element={<Dashboard />} />
		</Route>,
	];
	const router = createBrowserRouter(createRoutesFromElements(...routes));
	return (
		<ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
			<RouterProvider router={router} />
		</ThemeSwitcherProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={Store}>
		<App />
		<Toaster />
	</Provider>
);
