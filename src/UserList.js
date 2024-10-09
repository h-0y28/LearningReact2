// UserList.js
import React from "react";

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username} ({user.email})
        </li>
      ))}
    </ul>
  );
}

export default UserList;
