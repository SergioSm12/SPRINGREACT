import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { Userprovider } from "../context/Userprovider";
import { AuthContext } from "../auth/context/AuthContext";

export const UserRoutes = () => {
  const { login } = useContext(AuthContext);
  return (
    <>
      <Userprovider>
        <Navbar />
        <Routes>
          <Route path="users" element={<UsersPage />} />

          {!login.isAdmin || (
            <>
              <Route path="users/register" element={<RegisterPage />} />
              <Route path="users/edit/:id" element={<RegisterPage />} />
            </>
          )}

          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </Userprovider>
    </>
  );
};
