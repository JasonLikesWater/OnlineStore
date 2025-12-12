import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }){
  const user = localStorage.getItem("user");
  if(!user){
    return <Navigate to="/Pages/loginPage" replace />;
  }
  return <>{children}</>;
}
export default ProtectedRoute;