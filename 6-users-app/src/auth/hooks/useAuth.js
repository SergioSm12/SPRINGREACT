import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  user: undefined,
};
export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);

  const handlerLogin = ({ username, password }) => {
    const isLogin =loginUser({ username, password });
    if (isLogin) {
      const user = { username: "admin" };
      dispatch({
        type: "login",
        payload: user,
      });
      //Guardar en el sesion storage para que cuando se refresque la pagina no se actualice
      sessionStorage.setItem(
        "login",
        JSON.stringify({
          isAuth: true,
          user: user,
        })
      );
    } else {
      Swal.fire("Error Login", "Username o password invalidos", "error");
    }
  };

  const handlerLogout = () => {
    dispatch({
      type: "logout",
    });
    //Remover datos de la sesion despues del logout
    sessionStorage.removeItem("login");
  };
  return {
    login,
    handlerLogin,
    handlerLogout,
  };
};