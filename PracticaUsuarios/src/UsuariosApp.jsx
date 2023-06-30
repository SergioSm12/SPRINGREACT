import React from "react";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";
import { UserForm } from "./components/userForm";

export const UsuariosApp = () => {
  const {
    users,
    userSelected,
    initialUserForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
  } = useUsers();
  return (
    <div className="container my-4">
      <h2>Usuarios APP</h2>
      <div className="row">
        <div className="col">
          <UserForm
            userSelected={userSelected}
            initialUserForm={initialUserForm}
            handlerAddUser={handlerAddUser}
          />
        </div>
        <div className="col">
          {users.length === 0 ? (
            <div className="alert alert-warning">
              No hay usuarios en el sistema!
            </div>
          ) : (
            <UsersList
              handlerUserSelectedForm={handlerUserSelectedForm}
              handlerRemoveUser={handlerRemoveUser}
              users={users}
            />
          )}
        </div>
      </div>
    </div>
  );
};
