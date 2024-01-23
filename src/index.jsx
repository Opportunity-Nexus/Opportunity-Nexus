import React from "react";

import ReactDOM from "react-dom/client";
import "./global.css";
import Header from "./Components/header";
import Hero from "./Components/hero";
import About from "./Components/about";
import MentorsWords from "./Components/mentors-word";
import Team from "./Components/team";
import Faq from "./Components/faq";
import Footer from "./Components/footer";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import ForgetPass from "./Components/ForgetPass";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import CtaSection from "./Components/cta-section";
import CrispScript from "./Components/crisp";


const themes = {
  light: "public/light.css",
  dark: "public/dark.css",
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
            <CrispScript />
              <Header />
              <Hero />
              <About />
              <MentorsWords />
              <Team />
              <CtaSection />
              <Faq />
              <Footer />
            </>
          }
        />
        <Route
          path=""
          element={
            <div className="w-screen h-screen bg-white dark:bg-richblack-900 flex flex-col ">
              <Layout />
            </div>
          }
        >
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/ForgetPass" element={<ForgetPass />} />
        </Route>
      </>
    )
  );

  return (
    <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
      <RouterProvider router={router} />
    </ThemeSwitcherProvider>
  );
};

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <>
    <App />
    <Toaster />
  </>
);
