### 배열 항목 제거 하기

#### 필수 개념

1. **불변성 (Immutability)**
   - 상태는 직접 수정하지 않고, 새로운 상태를 생성하여 업데이트해야 함.
   - 상태 변경 추적, 성능 최적화, 예측 가능한 상태 관리를 가능하게 함.
   - **예시 메서드**: `filter`, `map`, `concat` 등 (원본 배열을 수정하지 않고 새로운 배열을 반환).
2. **상태 관리 (`useState`)**
   - 기존 상태를 수정하는 대신 새로운 상태로 교체해야 함.
   - 배열이나 객체를 다룰 때는 기존 상태를 복사한 후, 새로운 값을 추가하거나 제거해야 함.
3. **컴포넌트 구조화**
   - UI를 작은 컴포넌트로 나누어 관리하는 것이 좋음.
   - 코드 재사용성과 유지보수성을 높임.
   - 예) 항목 추가 및 제거 로직을 상위 컴포넌트에서 정의하고, 하위 컴포넌트로 데이터를 전달.
4. **`useRef`로 값 관리**
   - DOM 요소 참조 외에도 상태를 간직하는 용도로 사용 가능.
   - 상태 업데이트 시 리렌더링이 필요 없는 값을 저장하는 데 유용.
   - 예) 새로운 항목 추가 시 고유한 `id` 값을 관리할 때 사용.
5. **함수형 업데이트 (Functional Updates)**
   - 상태가 이전 상태에 의존할 때 함수형 업데이트를 사용하여 안전하게 상태를 변경 가능.
   - 예) `setState` 내부에서 함수를 사용하여 상태를 업데이트.
6. **이벤트 핸들러와 상태 변경**
   - 삭제 버튼 클릭 시 특정 `id`의 항목을 제거하는 이벤트 핸들러가 동작.
   - 상태를 직접 수정하지 않고 `filter`를 사용하여 새로운 배열로 상태를 교체.
   - 사용자 상호작용에 따라 동적인 상태 변경을 수행.

---

### 추가 개념

1. **불변성 (Immutability)**
   - 상태를 직접 수정하지 않고 항상 새로운 상태를 반환해야 함.
   - 성능 최적화 및 상태 추적의 용이성을 위한 원칙.
2. **함수형 업데이트 (Functional Updates)**
   - 상태가 이전 상태에 의존할 때 안전하게 업데이트하기 위해 사용.
   - 예: `setUsers((prevUsers) => prevUsers.filter(...))`.
3. **`useRef` 활용**
   - 값의 지속적인 저장에 사용할 수 있음.
   - 컴포넌트 리렌더링 시에도 `useRef`의 값은 유지됨.
4. **컴포넌트 분리**
   - 컴포넌트를 분리하여 유지보수성과 재사용성을 높일 수 있음.
   - 각 컴포넌트가 명확한 역할을 가짐.
5. **상태 관리 (`useState`)**
   - 입력값과 사용자 목록을 관리하며, 이벤트 핸들러를 통해 효율적인 데이터 흐름 구현.

---

### 코드 요약

1. **`User` 및 `UserList` 컴포넌트**
   - **`User` 컴포넌트**: 사용자의 정보를 보여주고 삭제 버튼을 렌더링. 클릭 시 해당 사용자의 `id`를 `onRemove` 함수에 전달.
   - **`UserList` 컴포넌트**: 여러 사용자를 배열로 받아 각 `User`를 렌더링. `onRemove` 함수도 부모로부터 전달받아 사용.
2. **`App` 컴포넌트**
   - **상태 관리**: `useState`를 이용해 사용자 목록과 입력값을 관리.
   - **`onRemove` 함수**: `filter` 메서드를 사용하여 특정 `id`를 제외한 사용자들로 새로운 배열을 생성하여 상태를 업데이트.
   - **`onCreate` 함수**: 새로운 사용자를 생성해 기존 배열에 추가, `useRef`로 `nextId` 값을 관리.
3. **배열에서 항목 제거 방법**
   - `filter` 메서드를 사용하여 특정 조건에 맞지 않는 항목들을 제거.
   - 불변성을 유지하며 새로운 배열을 반환.

```js
import React, { useRef, useState } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} />
    </>
  );
}

export default App;
```
