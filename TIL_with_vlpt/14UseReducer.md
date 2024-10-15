### `useReducer` ?

언제? **복잡한 상태 로직** 관리 or **여러 상태**가 관련된 상황
Redux와 비슷한 패턴을 제공
<u>액션</u>을 통한 명확한 상태 업데이트

---

### 1. **핵심 개념**

- **Reducer 함수**: 현재 상태와 액션을 입력받아, 새로운 상태를 반환
- **초기 상태**: 컴포넌트의 시작 상태
- **반환 값**: 현재 상태와 상태를 **업데이트**하는 `dispatch` 함수

---

### 2. **`useReducer` 사용 방법**

### 2.1 **Reducer 함수 정의**

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
```

### 2.2 **`useReducer` 사용**

```jsx
import React, { useReducer } from "react";

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
}
```

---

### 3. **언제 `useReducer`를 사용할까?**

- **복잡한 상태 로직**을 관리해야 할 때
- 여러 액션에 의해 상태가 **다양하게 업데이트**될 때
- Redux와 유사한 **명확한 패턴**을 선호할 때

---

### 4. **장점**

- 상태 업데이트 로직이 **명확**해짐
- 상태 관리의 **확장성**이 높음
- **복잡한 상태**도 관리 가능

---

### 5. **단점**

- 간단한 상태일 때는 **`useState`가 더 적합**
- 처음 사용하는 사람에게는 **복잡**하게 느껴질 수 있음

---

### 예제: `useReducer`로 Counter 컴포넌트 구현

#### 기존 `useState` 사용 코드

```jsx
import React, { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>+1</button>
      <button onClick={() => setNumber(number - 1)}>-1</button>
    </div>
  );
}
```

#### `useReducer` 사용 코드

```jsx
import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
}
```

---

### 6. **`useState` vs `useReducer`**

#### **`useState` 사용 시점**

- **단순한 상태**를 관리할 때 사용
- 예를 들어, **숫자, 문자열, boolean** 같은 **단일 값** 관리에 적합

#### **`useReducer` 사용 시점**

- **복잡한 상태 로직**이나 **여러 상태**를 관리할 때 적합
- 상태 변화가 **다양한 액션**에 의해 발생하는 경우

#### **두 방법의 차이점 요약**

| **특징**           | **`useState`**                   | **`useReducer`**                             |
| ------------------ | -------------------------------- | -------------------------------------------- |
| **상태 관리 대상** | 단일 값, 간단한 상태             | 여러 상태, 복잡한 상태                       |
| **상태 변화 로직** | 간단한 변화                      | 복잡한 변화, 여러 액션 처리 가능             |
| **사용 예시**      | 카운터, 입력 값 같은 간단한 상태 | 다양한 상태나 여러 액션이 필요한 복잡한 로직 |

---

### 7. **결론**

- **단순한 상태**는 `useState`가 더 적합.
- **복잡한 상태**나 **여러 액션**을 처리해야 하는 경우 `useReducer`가 더 적합.
- 상황에 맞게 두 훅을 선택해서 사용할 수 있음.
