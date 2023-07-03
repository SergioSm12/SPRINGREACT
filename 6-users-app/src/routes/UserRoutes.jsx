import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { useUsers } from "../hooks/useUsers";
import { Userprovider } from "../context/Userprovider";

export const UserRoutes = () => {
  return (
    <>
      <Userprovider>
        <Navbar />
        <Routes>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/register" element={<RegisterPage />} />
          <Route path="users/edit/:id" element={<RegisterPage />} />

          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </Userprovider>
    </>
  );
};
