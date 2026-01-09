import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login";
import Register from "./Register.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
