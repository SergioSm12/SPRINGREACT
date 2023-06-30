import React from "react";

export const UsersRow = ({
  id,
  username,
  email,
  handlerUserSelectedForm,
  handlerRemoveUser,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <button
          className="btn btn-outline-info"
          onClick={() => {
            handlerUserSelectedForm({
              id: id,
              username: username,
              email: email,
            });
          }}
        >
          Update
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => handlerRemoveUser(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
