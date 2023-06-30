import React from "react";

export const UserDetails = ({user,id}) => {
  return (
    <h1>
      Que tal! {user.name} {user.lastName} con id : {id}
    </h1>
  );
};
