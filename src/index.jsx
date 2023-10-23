import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css"
import Header from "./Components/header";
import Hero from "./Components/hero";
import About from "./Components/about";
import Team from "./Components/team";
import Footer from "./Components/footer";
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
  light: 'public/light.css',
  dark: 'public/dark.css',
};

const App = () => {
  return (
    <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
      	<RouterProvider router={router} /> 
    </ThemeSwitcherProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
