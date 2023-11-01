import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import Header from "./Components/header";
import Hero from "./Components/hero";
import About from "./Components/about";
import Team from "./Components/team";
import Footer from "./Components/footer";
import Signup from "./Components/Account/Signup";
import Signin from "./Components/Account/Signin";
import Layout from "./Components/Layout";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Hero />
            <About />
            <Team />
            <Footer />
          </>
        }
      />
      <Route path="" element={<Layout />}>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </>
  )
);

const themes = {
  light: "public/light.css",
  dark: "public/dark.css",
};

const App = () => {
  return (
    <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
      <RouterProvider router={router} />
    </ThemeSwitcherProvider>
  );
};

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<App />);
