### 배열에 새로운 항목을 추가

**1. 기본 컴포넌트 구성:**

- `CreateUser.js`: 두 개의 input 필드(계정명, 이메일)와 등록 버튼을 포함하는 컴포넌트.
  - 상태 관리는 부모 컴포넌트인 `App`에서 처리하고, props로 값을 전달받아 사용.

```jsx
// CreateUser.js
import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateUser;
```

---

**2. 상태 관리와 이벤트 핸들링 (`App.js`):**

- `useState`로 `inputs` 객체를 관리하여 input 값 변화에 대응.
- `useRef`로 고유한 사용자 ID를 관리.
- `onChange`: input 값 변경 처리.
- `onCreate`: 새로운 사용자 생성 및 배열 업데이트, input 초기화 처리.

```jsx
// App.js
import React, { useRef, useState } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function App() {
  const [inputs, setInputs] = useState({ username: "", email: "" });
  const { username, email } = inputs;

  const [users, setUsers] = useState([
    { id: 1, username: "velopert", email: "public.velopert@gmail.com" },
    { id: 2, username: "tester", email: "tester@example.com" },
    { id: 3, username: "liz", email: "liz@example.com" },
  ]);

  const nextId = useRef(4);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onCreate = () => {
    const user = { id: nextId.current, username, email };
    setUsers([...users, user]); // spread 연산자를 사용해 새로운 배열 생성
    setInputs({ username: "", email: "" });
    nextId.current += 1;
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  );
}

export default App;
```

---

**3. 배열에 항목 추가 방법:**

- **Spread 연산자 (`...users`)**:

  - 기존 배열을 복사한 후 새 항목을 추가하는 방식.

  ```jsx
  javascript
  코드 복사
  setUsers([...users, user]);

  ```

- **concat 함수**:

  - 배열을 수정하지 않고 새 배열을 반환하는 방식.

  ```jsx
  javascript
  코드 복사
  setUsers(users.concat(user));

  ```

---

### 핵심 사항:

- **불변성 유지**: 배열을 직접 변경하지 않고, spread 연산자나 `concat`을 사용해 배열을 복사한 후 항목을 추가.
- **useRef**: 고유 ID 생성을 위해 사용.
- **상태 초기화**: 새 항목을 추가한 후 input 필드의 값을 비우기 위해 `setInputs`로 초기화.

두 가지 방법 중 하나를 선택하여 배열에 새 항목을 추가할 수 있습니다.
