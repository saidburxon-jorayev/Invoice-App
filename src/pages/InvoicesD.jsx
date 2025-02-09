import React from "react";
import useThemeStore from "../store/useThemeStore";

function InvoicesD() {
  const { theme, setTheme } = useThemeStore();
  return (
    <>
      <h1
        className={`${
          theme == "dark" ? "text-white" : "text-black"
        } text-center text-6xl`}
      >
        Invoice Details
      </h1>
    </>
  );
}

export default InvoicesD;
