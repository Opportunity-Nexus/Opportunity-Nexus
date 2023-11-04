import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import SunIcon from "../assets/theme-icons/icon-sun.svg";
import MoonIcon from "../assets/theme-icons/icon-moon.svg";

export default function Theme() {
  const { switcher, themes, status } = useThemeSwitcher();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  if (status === "loading") {
    return <div>Loading styles...</div>;
  }

  const toggleDarkMode = () => {
    setIsDarkMode((previous) => {
      switcher({ theme: previous ? themes.light : themes.dark });
      return !previous;
    });
    isDarkMode
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
  };

  return (
    <div className="flex">
      <img
        src={`${isDarkMode ? SunIcon : MoonIcon}`}
        alt=""
        width={26}
        height={26}
        onClick={toggleDarkMode}
        className="cursor-pointer"
      />
    </div>
  );
}
