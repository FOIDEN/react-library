import React, { useState, useEffect } from "react";
import darkPng from "../../../assets/website/dark-mode-button.png";
import lightPng from "../../../assets/website/light-mode-button.png";

type Theme = "light" | "dark";

const DarkMode = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "dark";
  });

  const element = document.documentElement;

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="relative">
      <img
        src={lightPng}
        alt="Switch to dark mode"
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${
          theme === "dark" ? "opacity-0" : "opacity-100"}`}
      />
      <img
        src={darkPng}
        alt="Switch to light mode"
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className="w-12 cursor-pointer drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] duration-300"
      />
    </div>
  );
};

export default DarkMode;