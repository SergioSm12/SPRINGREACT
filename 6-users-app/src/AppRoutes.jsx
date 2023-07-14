import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { LoginPage } from "./auth/pages/LoginPage";
import { useAuth } from "./auth/hooks/useAuth";

export const AppRoutes = () => {
  const { login } = useAuth();

  if (login.isloginLoading) {
    return (
      <div className="container my-4 text-center">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
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
