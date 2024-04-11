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
import MyOpportunities from "./Pages/MyOpportunities/MyOpportunities";
import MyProfile from "./Pages/MyProfile/MyProfile";
import Settings from "./Pages/Settings/Settings";
import OpportunityPanel from "./Pages/OpportunityPanel/OpportunityPanel";

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
      <Route path="/dashboard/my-profile" element={<MyProfile />} />
      <Route path="/dashboard/my-opportunities" element={<MyOpportunities />} />
      <Route path="/dashboard/my-settings" element={<Settings />} />
      <Route path="dashboard/opportunity-panel" element={<OpportunityPanel />} />
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
