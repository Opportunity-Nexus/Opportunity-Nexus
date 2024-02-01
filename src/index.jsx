import React,{ useState } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./global.css";
import Layout from "./Common/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import ForgetPass from "./Pages/Authentication/ForgetPass";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import './Components/theme';

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import Contests from "./Pages/Contests";
import Jobs from "./Pages/Jobs";

const themes = {
	light: "public/light.css",
	dark: "public/dark.css",
};

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	console.log(isLoggedIn);
	const routes = [
		<Route
			element={
				<div className="w-screen h-screen bg-white dark:bg-richblack-900 flex flex-col ">
					<Layout />
				</div>
			}
		>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
			<Route
				path="/signup"
				element={<Signup setIsLoggedIn={setIsLoggedIn} />}
			/>
			<Route path="/contests" element={<Contests isLoggedIn={isLoggedIn} />} />
			<Route path="/jobs" element={<Jobs isLoggedIn={isLoggedIn} />} />
			<Route path="/ForgetPass" element={<ForgetPass/>} />
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
	<>
		<App />
		<Toaster />
	</>
);
