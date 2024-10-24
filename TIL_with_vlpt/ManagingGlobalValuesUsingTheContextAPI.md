### Context API를 사용한 전역 값 관리

### Context API란?

- React에서 **전역 상태를 쉽게 관리**할 수 있게 해주는 기능
- 여러 컴포넌트에서 **공통으로 사용하는 데이터**(상태, 함수 등)를 <U>상위 컴포넌트에서 정의</U>, 하위 컴포넌트에서 **쉽게 접근**하게 도움

### 주요 구성 요소

1. **Context 생성**:
   `createContext()` 사용
2. **Provider**:
   Context의 값 제공하는 컴포넌트
   하위 컴포넌트에서 이 값을 사용할 수 있게 해줌
3. **useContext**:
   하위 컴포넌트에서 Context의 값을 <u>읽어오는 데</u> 사용

---

### 예제 코드 설명

`User` 관리
`dispatch` 함수를 Context API를 통해 하위 컴포넌트에서 <u>직접 사용</u>할 수 있도록 설정

### 1. Context 생성

```js
import React, { createContext, useReducer } from "react";

const UserDispatch = createContext(null);

const initialState = [
  { id: 1, username: "user1", active: false },
  { id: 2, username: "user2", active: false },
];

// Reducer 함수 정의
function userReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_USER":
      return state.map((user) =>
        user.id === action.id ? { ...user, active: !user.active } : user
      );
    case "REMOVE_USER":
      return state.filter((user) => user.id !== action.id);
    default:
      throw new Error("Unknown action type");
  }
}

const App = () => {
  const [users, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserDispatch.Provider value={dispatch}>
      <UserList users={users} />
      <CreateUser />
    </UserDispatch.Provider>
  );
};
```

### 2. UserList 컴포넌트

사용자 목록 렌더링

```js
const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};
```

### 3. User 컴포넌트

개별 사용자를 보여주고 `dispatch`를 사용하여 사용자를 토글하거나 삭제하는 기능 구현

```js
import { useContext } from "react";
import { UserDispatch } from "./App";

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
```

### 4. CreateUser 컴포넌트

사용자를 추가하는 기능 구현
여기에서도 `dispatch`를 사용하여 새 사용자를 추가 가능

```js
import { useContext, useState } from "react";
import { UserDispatch } from "./App";

const CreateUser = () => {
  const dispatch = useContext(UserDispatch);
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_USER", username });
    setUsername("");
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
```

---

### 결론

- **Context API**와 **useReducer**를 사용하면 여러 컴포넌트를 거쳐야 하는 복잡한 props 전달을 피하고, 전역적으로 상태를 관리 가능
- 코드가 더 간결해지고 가독성이 높아짐
