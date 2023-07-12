import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRow = ({ id, username, email, admin }) => {
  const { handlerUserSelectedForm, handlerRemoveUser } =
    useUsers();
  const { login } = useAuth();
  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      {!login.isAdmin || (
        <>
          <td>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                handlerUserSelectedForm({
                  id: id,
                  username: username,
                  email: email,
                  admin: admin,
                });
              }}
            >
              Update
            </button>
          </td>
          <td>
            <NavLink
              className={"btn btn-secondary btn-sm"}
              to={"/users/edit/" + id}
            >
              Update Row
            </NavLink>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handlerRemoveUser(id)}
            >
              Remove
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
