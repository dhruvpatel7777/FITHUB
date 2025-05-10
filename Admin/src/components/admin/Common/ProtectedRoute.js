import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Replace this with your actual authentication check
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
