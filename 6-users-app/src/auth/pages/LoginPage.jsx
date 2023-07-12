import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

const initialLoginForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  //Traemos los datos del contexto
  const { handlerLogin } = useAuth();

  //Creamos use state para monitorear datos  y dar state inicial
  const [loginForm, setLoginForm] = useState(initialLoginForm);

  //Desestruturamos
  const { username, password } = loginForm;
  //Guardamos a medida que vamos cambaindo los campos
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  //Al enviar informacion
  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      Swal.fire(
        "Error de validacion",
        "Username y password requeridos",
        "error"
      );
    }
    //Aca implementamos el login
    handlerLogin({ username, password });

    setLoginForm(initialLoginForm);
  };

  return (
    <div className="modal" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login Page</h5>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <input
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange}
              />
              <input
                className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
