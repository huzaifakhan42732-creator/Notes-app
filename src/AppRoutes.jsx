import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login";
import Register from "./Register.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root "/" to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Your main routes */}
      <Route path="/app" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Catch-all for unknown routes */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
