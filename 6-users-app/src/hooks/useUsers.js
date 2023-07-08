import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  //Uso de reducers
  const [users, dispatch] = useReducer(usersReducer, initialUsers);

  //Usuario seleccionado para update
  const [userSelected, setUserSelected] = useState(initialUserForm);

  //Ocultar y mostrar formulario
  const [visibleForm, setVisibleForm] = useState(false);

  //Estado para manejar errors
  const [errors, setErrors] = useState(initialErrors);

  const navigate = useNavigate();

  const { login, handlerLogout } = useContext(AuthContext);

  const getUsers = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingUsers",
      payload: result.data,
    });
  };

  //Crear usuario
  const handlerAddUser = async (user) => {
    const type = user.id === 0 ? "addUser" : "updateUser";

    //Crear y actualizar desde el backend
    if (!login.isAdmin) return;
    let response;

    try {
      if (user.id === 0) {
        //Guardar desde el back end
        response = await save(user);
      } else {
        //Actualizar desde el backend
        response = await update(user);
      }

      dispatch({
        type: type,
        payload: response.data,
      });

      Swal.fire(
        user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
        user.id === 0
          ? "El usuario ha sido creado con exito"
          : "El usuario ha sido actualizado con exito",
        "success"
      );

      handlerCloseForm();
      navigate("/users");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        setErrors(error.response.data);
      }
      //Validacion para los uniques
      else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        //Traemos los constraint de la table users unique
        const UK_username = "UK_r43af9ap4edm43mmtq01oddj6";
        const UK_email = "UK_6dotkott2kjsp8vw4d0m25fb7";
        if (error.response.data?.message?.includes(UK_username)) {
          setErrors({ username: "El username ya existe." });
        }
        if (error.response.data?.message?.includes(UK_email)) {
          setErrors({ email: "El email ya existe." });
        }
      } else if (error.response?.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  //Eliminar Usuario
  const handlerRemoveUser = (id) => {
    if (!login.isAdmin) return;
    Swal.fire({
      title: "Esta seguro que desea eliminar?",
      text: "Cuidado el usuario sera eliminado ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then( async(result) => {
      if (result.isConfirmed) {
        try {
          //Eliminar desde el backend
          await remove(id);
          dispatch({
            type: "removeUser",
            payload: id,
          });

          Swal.fire(
            "Usuario Eliminado!",
            "El usuario ha sido eliminado con exito",
            "success"
          );
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  //Funcion para seleccionar user update
  const handlerUserSelectedForm = (user) => {
    //Agregamos el objeto seleccionado al estado userSelected
    setVisibleForm(true);
    setUserSelected({ ...user });
  };

  //mostrar formulario
  const handlerOpenForm = () => {
    setVisibleForm(true);
  };
  //Ocultar formulario
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
    setErrors({});
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  };
};
