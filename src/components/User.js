import React, { useContext } from "react";
import { UserDispatch } from "../App";

const User = ({ user }) => {
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b onClick={() => dispatch({ type: "TOGGLE_USER", id: user.id })}>
        {user.username} {user.active ? "(활성)" : "(비활성)"}
      </b>
      <button onClick={() => dispatch({ type: "REMOVE_USER", id: user.id })}>
        삭제
      </button>
    </div>
  );
};

export default User;
