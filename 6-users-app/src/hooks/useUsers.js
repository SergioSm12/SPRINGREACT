import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  {
    id: 1,
    username: "pepe",
    password: "12345",
    email: "pepe@correo.com",
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

  //Ocultar y mostrar formulario
  const [visibleForm, setVisibleForm] = useState(false);

  const navigate = useNavigate();

  //Crear usuario
  const handlerAddUser = (user) => {
    const type = user.id === 0 ? "addUser" : "updateUser";

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

    handlerCloseForm();
    navigate("/users");
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
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
  };
};
