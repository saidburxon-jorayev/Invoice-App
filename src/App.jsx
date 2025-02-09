import React from "react";
import { Routes, Route } from "react-router-dom";
import Invoices from "./pages/Invoices";
import InvoicesD from "./pages/InvoicesD";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
