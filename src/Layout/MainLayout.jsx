import { useState } from "react";
import Logo from "../images/logo.svg";
import Light from "../images/light.svg";
import Dark from "../images/dark.svg";
import Man from "../images/man.png";

function MainLayout() {
  const [theme, setTheme] = useState(true);

  function handleChangeTheme() {
    if (theme) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setTheme(!theme);
  }
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between xl:flex-col xl:w-[103px] xl:h-dvh xl:rounded-r-[20px] bg-[#373B53]">
        <div className="image">
          <img src={Logo} alt="logo" />
        </div>
        <div className="sm:flex xl:flex-col xl:pb-[24px] sm:items-center sm:gap-[65px]">
          <div className="sm:flex sm:items-center">
            <div>
              <img
                className="cursor-pointer"
                onClick={handleChangeTheme}
                src={theme ? Light : Dark}
                alt={theme ? "light" : "dark"}
              />
            </div>
          </div>
          <div className="man">
            <img src={Man} alt="avatar" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
