import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Enter from "./components/Enter";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/enter" element={<App />} />
    </Routes>
  );
};

export default AppRoutes;
