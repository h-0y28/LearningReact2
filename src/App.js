import React, { createContext, useReducer } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import userReducer from "./userReducer"; // userReducer를 별도의 파일로 분리

export const UserDispatch = createContext(null);

const initialState = [
  { id: 1, username: "user1", active: false },
  { id: 2, username: "user2", active: false },
];

const App = () => {
  const [users, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserDispatch.Provider value={dispatch}>
      <UserList users={users} />
      <CreateUser />
    </UserDispatch.Provider>
  );
};

export default App;
