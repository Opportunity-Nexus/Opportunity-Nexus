import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css"
import Header from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import Team from "./components/team";
import Footer from "./components/footer";
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
	createRoutesFromElements(
		<>
		<Route path="" element={<><Header /> <Hero /> <About /> <Team /> <Footer /></>} />
		</>
	)
);

const themes = {
	light: '',
	dark: '',
  };

const App = () => {
  return (
    <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
      	<RouterProvider router={router} /> 
    </ThemeSwitcherProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
