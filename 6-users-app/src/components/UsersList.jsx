import React from "react";
import { UserRow } from "./UserRow";

export const UsersList = ({
  handlerUserSelectedForm,
  handlerRemoveUser,
  users = [],
}) => {
  return (
    <table className="table table-hover table-striped">
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
        {users.map(({ id, username, email}) => (
          <UserRow
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
