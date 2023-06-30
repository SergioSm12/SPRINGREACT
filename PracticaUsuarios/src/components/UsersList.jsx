import React from "react";
import { UsersRow } from "./UsersRow";

export const UsersList = ({
  handlerUserSelectedForm,
  handlerRemoveUser,
  users = [],
}) => {
  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, username, email }) => (
          <UsersRow
            key={id}
            id={id}
            username={username}
            email={email}
            handlerUserSelectedForm={handlerUserSelectedForm}
            handlerRemoveUser={handlerRemoveUser}
          />
        ))}
      </tbody>
    </table>
  );
};
