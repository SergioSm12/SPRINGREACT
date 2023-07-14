import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAllPages, remove, save, update } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  removeUser,
  updateUser,
  loadingUsers,
  onUserSelectedForm,
  onOpenForm,
  onCloseForm,
  initialUserForm,
  loadingError,
} from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers = () => {
  //Uso de reducers
  //const [users, dispatch] = useReducer(usersReducer, initialUsers);

  const { users, userSelected, visibleForm, errors, isLoading, paginator } =
    useSelector((state) => state.users);
  const dispatch = useDispatch();

  //Usuario seleccionado para update
  // const [userSelected, setUserSelected] = useState(initialUserForm);

  //Ocultar y mostrar formulario
  //const [visibleForm, setVisibleForm] = useState(false);

  const navigate = useNavigate();

  const { login, handlerLogout } = useAuth();

  const getUsers = async (page = 0) => {
    try {
      const result = await findAllPages(page);
      //console.log(result);
      dispatch(loadingUsers(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
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
        dispatch(addUser(response.data));
      } else {
        //Actualizar desde el backend
        response = await update(user);
        dispatch(updateUser(response.data));
      }

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
        dispatch(loadingError(error.response.data));
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
          dispatch(loadingError({ username: "El username ya existe." }));
        }
        if (error.response.data?.message?.includes(UK_email)) {
          dispatch(loadingError({ email: "El email ya existe." }));
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //Eliminar desde el backend
          await remove(id);

          dispatch(removeUser(id));

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
    //setVisibleForm(true);
    //setUserSelected({ ...user });
    dispatch(onUserSelectedForm({ ...user }));
  };

  //mostrar formulario
  const handlerOpenForm = () => {
    //setVisibleForm(true);
    dispatch(onOpenForm());
  };
  //Ocultar formulario
  const handlerCloseForm = () => {
    //setVisibleForm(false);
    //setUserSelected(initialUserForm);
    dispatch(onCloseForm());
    dispatch(loadingError({}));
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    isLoading,
    paginator,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  };
};
