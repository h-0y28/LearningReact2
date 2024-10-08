#### 배열 예시

아래 예시로 배열 렌더링

```jsx
const users = [
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
];
```

---

### 1. 기본적인 렌더링 방법

고정된 배열의 값을 **수동**으로 렌더링:

```jsx
import React from "react";

function UserList() {
  const users = [
    { id: 1, username: "velopert", email: "public.velopert@gmail.com" },
    { id: 2, username: "tester", email: "tester@example.com" },
    { id: 3, username: "liz", email: "liz@example.com" },
  ];

  return (
    <div>
      <div>
        <b>{users[0].username}</b> <span>({users[0].email})</span>
      </div>
      <div>
        <b>{users[1].username}</b> <span>({users[1].email})</span>
      </div>
      <div>
        <b>{users[2].username}</b> <span>({users[2].email})</span>
      </div>
    </div>
  );
}

export default UserList;
```

**비효율적**
**중복된 코드**를 반복해서 작성
⇒ **재사용 가능**한 컴포넌트를 만드는 것이 좋음

---

### 2. 재사용 가능한 컴포넌트 만들기

```jsx
import React from "react";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  // 배열
  const users = [
    { id: 1, username: "velopert", email: "public.velopert@gmail.com" },
    { id: 2, username: "tester", email: "tester@example.com" },
    { id: 3, username: "liz", email: "liz@example.com" },
  ];

  return (
    <div>
      <User user={users[0]} />
      <User user={users[1]} />
      <User user={users[2]} />
    </div>
  );
}

export default UserList;
```

배열의 길이가 변경될 경우, 각각의 컴포넌트를 수동으로 업데이트해야 하는 번거로움이 사라짐
but, **동적인 배열을 렌더링하려면 `map()` 함수**를 사용해야 함

---

### 3. `map()`을 사용한 동적 렌더링

리액트에서 배열을 동적으로 렌더링할 때는 `map()` 함수를 사용하여 배열의 각 요소를 렌더링함

```jsx
import React from "react";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    { id: 1, username: "velopert", email: "public.velopert@gmail.com" },
    { id: 2, username: "tester", email: "tester@example.com" },
    { id: 3, username: "liz", email: "liz@example.com" },
  ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
```

이 코드는 모든 사용자 정보를 간단하게 렌더링
but, **`key` props를 설정하는 것을 잊지 말아야 함 ⭐**

---

### 4. `key`의 중요성

리액트는 배열을 렌더링할 때 각 요소에 고유한 `key`를 필요로 함
이는 배열의 업데이트를 더 효율적으로 수행할 수 있도록 도와줌
고유한 값이 없다면 배열의 인덱스를 `key`로 사용할 수 있음:

```jsx
<div>
  {users.map((user, index) => (
    <User user={user} key={index} />
  ))}
</div>
```

하지만 인덱스를 `key`로 사용하면 배열의 요소가 변경되었을 때 효율성이 떨어질 수 있음
⇒ 가능한 고유한 값을 사용하는 것이 좋음

---

#### 5. `key`가 없는 경우의 문제

`key`가 없으면 기본적으로 인덱스 값을 사용하게 되어 리렌더링 시 비효율적으로 업데이트가 이루어짐
고유한 `key`를 사용하면 업데이트가 더 효율적으로 수행되며, 콘솔에 경고 메시지가 나타나지 않게 됨

---

### 정리

- 리액트에서 배열 렌더링 : `map()` 함수 → 동적으로 처리
- 각 요소에 고유한 `key`를 부여 → 효율적인 업데이트
- 중복되는 `key` 값 → 오류 (주의)
