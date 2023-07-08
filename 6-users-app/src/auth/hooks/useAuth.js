import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
};
export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  //Uso de navigate para mostrar los users
  const navigate = useNavigate();

  const handlerLogin = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split(".")[1]));
      console.log(claims);
      const user = { username: response.data.username };
      dispatch({
        type: "login",
        payload: { user, isAdmin: claims.isAdmin },
      });
      //Guardar en el sesion storage para que cuando se refresque la pagina no se actualice
      sessionStorage.setItem(
        "login",
        JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user: user,
        })
      );
      sessionStorage.setItem("token", `Bearer ${token}`);
      //Agregamos la ruta a redirigir
      navigate("/users");
    } catch (error) {
      if (error.response?.status == 401) {
        Swal.fire("Error Login", "Username o password invalidos", "error");
        
      } else if (error.response?.status == 403) {
        Swal.fire("Error Login", "No tiene acceso al recurso o permisos!", "error");

      } else {
        throw error;
      }
    }
  };

  const handlerLogout = () => {
    dispatch({
      type: "logout",
    });
    //Remover datos de la sesion despues del logout
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("login");
    sessionStorage.clear();
  };
  return {
    login,
    handlerLogin,
    handlerLogout,
  };
};
