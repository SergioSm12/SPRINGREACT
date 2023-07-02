import { LoginPage } from "./auth/pages/LoginPage";
import { useAuth } from "./auth/hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";

export const UsersApp = () => {
  const { login, handlerLogin, handlerLogout } = useAuth();
  return (
    <Routes>
      {login.isAuth ? (
        //Rutas privadas
        <Route
          path="/*"
          element={<UserRoutes login={login} handlerLogout={handlerLogout} />}
        />
      ) : (
        //Rutas Publicas
        <>
          <Route
            path="/login"
            element={<LoginPage handlerLogin={handlerLogin} />}
          />

          <Route path="/*" element={<Navigate to={"/login"} />} />
        </>
      )}
    </Routes>
  );
};
