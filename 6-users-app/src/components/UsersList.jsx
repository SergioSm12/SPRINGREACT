import React, { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../context/UserContext";

export const UsersList = () => {
  const { users } = useContext(UserContext);
  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Update</th>
          <th>Update route</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, username, email }) => (
          <UserRow
            key={id}
            id={id}
            username={username}
            email={email}
          />
        ))}
      </tbody>
    </table>
  );
};
