import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { LoginPage } from "./auth/pages/LoginPage";
import { useAuth } from "./auth/hooks/useAuth";

export const AppRoutes = () => {
  const { login } = useAuth();
  return (
    <Routes>
      {login.isAuth ? (
        //Rutas privadas
        <Route path="/*" element={<UserRoutes />} />
      ) : (
        //Rutas Publicas
        <>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/*" element={<Navigate to={"/login"} />} />
        </>
      )}
    </Routes>
  );
};
