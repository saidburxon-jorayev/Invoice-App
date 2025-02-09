import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Invoices from "./pages/Invoices";
import InvoicesD from "./pages/InvoicesD";
import MainLayout from "./Layout/MainLayout";
import useThemeStore from "./store/useThemeStore";

function App() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [setTheme]);

  return (
    <div className={`${theme === "light" ? "bg-[#F8F8FB]" : "bg-[#141625]"}`}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Invoices />
            </MainLayout>
          }
        />
        <Route
          path="/:id"
          element={
            <MainLayout>
              <InvoicesD />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
