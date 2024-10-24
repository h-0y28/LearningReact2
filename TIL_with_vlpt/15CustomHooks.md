## 커스텀 Hook `useInputs` 구현하기

### 1. 디렉터리 및 파일 생성

- `src` 디렉터리 내에 `hooks` 디렉터리를 생성
- `hooks` 디렉터리 내에 `useInputs.js` 파일 생성

### 2. `useInputs.js` 코드 작성

```jsx
import { useState, useCallback } from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
```

### 3. `App.js` 수정

- `useReducer`에서 기존 `inputs` 제거
- `useInputs` 사용하여 입력값 관리

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInputs";

const initialState = {
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    { id: 2, username: "tester", email: "tester@example.com", active: false },
    { id: 3, username: "liz", email: "liz@example.com", active: false },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return { users: state.users.concat(action.user) };
    case "TOGGLE_USER":
      return {
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return { users: state.users.filter((user) => user.id !== action.id) };
    default:
      return state;
  }
}

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: { id: nextId.current, username, email },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({ type: "TOGGLE_USER", id });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: "REMOVE_USER", id });
  }, []);

  const count = useMemo(
    () => users.filter((user) => user.active).length,
    [users]
  );

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
```

### 4. 커스텀 Hook 사용의 장점

- 로직을 재사용하여 코드의 중복을 줄임
- 컴포넌트의 가독성 향상

### 더 해볼 것

- `useInputs` 커스텀 Hook을 `useReducer`를 사용하여 구현
