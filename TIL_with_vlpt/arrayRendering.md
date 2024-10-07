# 배열 렌더링하기

이번 섹션에서는 리액트에서 배열을 렌더링하는 방법을 알아보겠습니다. 예를 들어, 다음과 같은 사용자 배열이 있다고 가정해봅시다:

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

이 데이터를 컴포넌트로 렌더링하기 위해서는 여러 가지 방법이 있습니다.

### 1. 기본적인 렌더링 방법

고정된 배열의 값을 수동으로 렌더링할 수 있습니다:

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

이 방법은 비효율적이며, 중복된 코드를 반복해서 작성해야 합니다. 그래서 재사용 가능한 컴포넌트를 만드는 것이 좋습니다.

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

이제 배열의 길이가 변경될 경우, 각각의 컴포넌트를 수동으로 업데이트해야 하는 번거로움이 사라졌습니다. 하지만 동적인 배열을 렌더링하려면 `map()` 함수를 사용해야 합니다.

### 3. `map()`을 사용한 동적 렌더링

리액트에서 배열을 동적으로 렌더링할 때는 `map()` 함수를 사용하여 배열의 각 요소를 렌더링합니다:

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

이 코드는 모든 사용자 정보를 간단하게 렌더링합니다. 하지만 `key` props를 설정하는 것을 잊지 말아야 합니다.

### 4. `key`의 중요성

리액트는 배열을 렌더링할 때 각 요소에 고유한 `key`를 필요로 합니다. 이는 배열의 업데이트를 더 효율적으로 수행할 수 있도록 도와줍니다. 고유한 값이 없다면 배열의 인덱스를 `key`로 사용할 수 있습니다:

```jsx
<div>
  {users.map((user, index) => (
    <User user={user} key={index} />
  ))}
</div>
```

하지만 인덱스를 `key`로 사용하면 배열의 요소가 변경되었을 때 효율성이 떨어질 수 있습니다. 따라서 가능한 고유한 값을 사용하는 것이 좋습니다.

### 5. `key`가 없는 경우의 문제

`key`가 없으면 기본적으로 인덱스 값을 사용하게 되어 리렌더링 시 비효율적으로 업데이트가 이루어집니다. 고유한 `key`를 사용하면 업데이트가 더 효율적으로 수행되며, 콘솔에 경고 메시지가 나타나지 않게 됩니다.

### 정리

- 리액트에서 배열을 렌더링할 때는 `map()` 함수를 사용하여 동적으로 처리합니다.
- 각 요소에 고유한 `key`를 부여하여 효율적인 업데이트가 이루어질 수 있도록 합니다.
- 중복되는 `key` 값이 있으면 오류가 발생할 수 있으므로 주의해야 합니다.
