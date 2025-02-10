import { useEffect, useState } from "react";
import Logo from "../images/logo.svg";
import Light from "../images/light.svg";
import Dark from "../images/dark.svg";
import Man from "../images/man.png";
import useThemeStore from "../store/useThemeStore";

function MainLayout({ children }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function handleChangeTheme() {
    const htmlElement = document.documentElement;

    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    let themer = localStorage.getItem("theme");
    if (themer == "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <>
      <div className="xl:flex">
        <div
          className={`sm:flex flex justify-between sm:items-center sm:justify-between xl:flex-col xl:w-[103px] xl:fixed xl:left-0 xl:bottom-0 xl:top-0 xl:rounded-r-[20px] ${
            theme == "light" ? "bg-[#373B53]" : "bg-[#1E2139]"
          }`}
        >
          <div className="image">
            <img src={Logo} alt="logo" />
          </div>
          <div className="sm:flex flex gap-[48px] items-center p-[24px] xl:flex-col xl:pb-[24px] sm:items-center sm:gap-[65px]">
            <div className="sm:flex sm:items-center">
              <div>
                <img
                  className="cursor-pointer duration-1000"
                  onClick={handleChangeTheme}
                  src={localStorage.getItem("theme") == "light" ? Dark : Light}
                  alt={theme ? "dark" : "light"}
                />
              </div>
            </div>
            <div className="man">
              <img src={Man} alt="avatar" />
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default MainLayout;
