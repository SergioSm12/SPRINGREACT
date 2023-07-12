import { UserRow } from "./UserRow";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {
  const { users } = useUsers();
  const { login } = useAuth();
  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          {!login.isAdmin || (
            <>
              <th>Update</th>
              <th>Update route</th>
              <th>Delete</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, username, email, admin }) => (
          <UserRow
            key={id}
            id={id}
            username={username}
            email={email}
            admin={admin}
          />
        ))}
      </tbody>
    </table>
  );
};
