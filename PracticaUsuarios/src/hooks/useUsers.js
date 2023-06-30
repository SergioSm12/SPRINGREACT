import React, { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";

const initialUsers = [
  {
    id: 1,
    username: "Sergio",
    password: "12345",
    email: "sergio@correo.com",
  },
];
const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};
export const useUsers = () => {
  //Uso de reducers
  const [users, dispatch] = useReducer(usersReducer, initialUsers);

  //Usuario seleccionado para update
  const [userSelected, setUserSelected] = useState(initialUserForm);
  //Crear usuario
  const handlerAddUser = (user) => {
    let type;

    if (user.id === 0) {
      type = "addUser";
    } else {
      type = "updateUser";
    }

    dispatch({
      type: type,
      payload: user,
    });

    Swal.fire(
      user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
      user.id === 0
        ? "El usuario ha sido creado con exito"
        : "El usuario ha sido actualizado con exito",
      "success"
    );
  };

  //Eliminar Usuario
  const handlerRemoveUser = (id) => {
    Swal.fire({
      title: "Esta seguro que desea eliminar?",
      text: "Cuidado el usuario sera eliminado ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "removeUser",
          payload: id,
        });

        Swal.fire(
          "Usuario Eliminado!",
          "El usuario ha sido eliminado con exito",
          "success"
        );
      }
    });
  };

  //Funcion para seleccionar user update
  const handlerUserSelectedForm = (user) => {
    //Agregamos el objeto seleccionado al estado userSelected
    setUserSelected({ ...user });
  };
  return {
    users,
    userSelected,
    initialUserForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
  };
};
