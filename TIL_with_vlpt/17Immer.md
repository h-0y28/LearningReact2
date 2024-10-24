# 1. 불변성 관리란?

리액트에서 상태를 업데이트할 때는 **불변성**을 지키는 것이 중요함
**직접** 객체나 배열을 수정하면 **안 되며**, **새로운 객체나 배열을 생성**해야 함 !!

> 불변성?
> 객체나 데이터 구조의 상태가 변경되지 않음을 의미
> = 기존의 데이터를 수정X + 새로운 데이터를 만들어내는 방식으로 작업하는 것

### 잘못된 예:

```jsx
const object = {
  a: 1,
  b: 2,
};

// 직접 수정하면 안 됨 !!
object.b = 3;
```

### 올바른 예:

```jsx
const object = {
  a: 1,
  b: 2,
};

// ... 연산자를 사용해 새로운 객체 생성
const nextObject = {
  ...object,
  b: 3,
};
```

### 배열 업데이트 예:

`push`, `splice`(직접 변경) 등 사용 X,
`concat`, `filter`, `map`(새로운 배열 생성) 등 사용 O

```jsx
const todos = [
  { id: 1, text: "할 일 #1", done: true },
  { id: 2, text: "할 일 #2", done: false },
];

// **새로운** 항목 추가
const inserted = todos.concat({ id: 3, text: "할 일 #3", done: false });

// 항목 제거
const filtered = todos.filter((todo) => todo.id !== 2);

// 상태 토글
const toggled = todos.map((todo) =>
  todo.id === 2 ? { ...todo, done: !todo.done } : todo
);
```

## 과연 이 방법이 좋을까?

### 복잡한 객체 구조

<u>복잡한 데이터 구조</u>에서 불변성을 지키며 업데이트하기가 어려울 수 있다.
ex)

```jsx
const state = {
  posts: [
    {
      id: 1,
      title: "제목입니다.",
      body: "내용입니다.",
      comments: [{ id: 1, text: "와 정말 잘 읽었습니다." }],
    },
    {
      id: 2,
      title: "제목입니다.",
      body: "내용입니다.",
      comments: [{ id: 2, text: "또 다른 댓글 어쩌고 저쩌고" }],
    },
  ],
  selectedId: 1,
};
```

여기서 `id`가 1인 `post` 객체를 찾아 <u>새로운 댓글을 추가</u>하려면, 다음과 같이 업데이트해야 함

```jsx
const nextState = {
  ...state,
  posts: state.posts.map(post =>
    .id === 1
      ? {
          ...post,
          comments: post.comments.concat({ id: 3, text: '새로운 댓글' })
        }
      : post
  )
};

```

### > **이 방법은 코드가 복잡해질 수 있음 !**

---

# 2. Immer

불변성을 관리하는 라이브러리
상태를 업데이트할 때 직접 불변성을 신경 쓰지 않고도 업데이트 가능
Immer 사용 → 간결한 코드

### 설치 방법

먼저 Immer 설치

```bash
$ yarn add immer
```

### 사용 방법

코드 상단에 Immer를 불러오기

```jsx
import produce from "immer";
```

첫 번째 매개변수: 수정할 상태
두 번째 매개변수: 업데이트 로직을 정의하는 함수 전달 함

### 예시

```jsx
const state = {
  number: 1,
  dontChangeMe: 2,
};

const nextState = produce(state, (draft) => {
  draft.number += 1; // 불변성을 신경 쓰지 않고 업데이트 ⭐⭐
});

console.log(nextState);
// { number: 2, dontChangeMe: 2 }
```

---

# 3. 리듀서에서 Immer 사용하기

⇒ 상태를 간편하게 업데이트
ex) 사용자 관리 프로젝트의 상태를 관리

### App.js

```jsx
import React, { useReducer, useMemo } from "react";
import produce from "immer";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

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
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(
    () => users.filter((user) => user.active).length,
    [users]
  );

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

---

# 4. Immer와 함수형 업데이트

⇒ 유용
ex) `useState`와 함께 사용 가능

### 예시:

```jsx
const [todo, setTodo] = useState({ text: "Hello", done: false });

const onClick = useCallback(() => {
  setTodo(
    produce((draft) => {
      draft.done = !draft.done; // 불변성을 신경 쓰지 않고 업데이트
    })
  );
}, []);
```

---

# 5. 성능 고려 사항

Immer는 매우 유용하지만, 성능 면에서는 불변성을 **직접 관리하는 코드가 더 빠를 수 있음**
ex) 50,000개의 요소 중 5,000개를 업데이트할 때, Immer는 31ms가 걸리고, Native Reducer는 6ms가 걸림
하지만 일반적으로 이러한 성능 차이는 **눈에 띄지 않으며**, <u>데이터가 적을 경우 큰 문제가 되지 않음</u>
Immer는 Proxy 기능을 사용하기 때문에, 구형 브라우저나 React Native에서는 성능이 저하될 수 있음

## 결론

Immer는 **복잡한 데이터 구조**에서 **불변성을 유지**하면서 **코드를 간결하게 작성**할 수 있게 도와주는 강력한 도구임
그러나 항상 사용하는 것 X 데이터 구조가 **복잡해질 때만 사용하는 것이 좋음**
필요한 경우에만 Immer를 사용하고, **간단한 업데이트는 기존 JavaScript 방법으로 처리**하기
