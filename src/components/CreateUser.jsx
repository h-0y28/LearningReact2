import React, { useContext, useState } from "react";
import { UserDispatch } from "../App";

const CreateUser = () => {
  const dispatch = useContext(UserDispatch);
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      dispatch({ type: "ADD_USER", username });
      setUsername("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default CreateUser;
