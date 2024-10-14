### `useReducer` ?

- **복잡한 상태** 로직이나 **여러** 하위 상태를 관리할 때 사용하는 Hook
- Redux와 유사한 패턴, 명확한 상태 업데이트 관리 가능

### 1. 기본 개념

- **reducer 함수**: 현재 상태와 액션을 인자로 받음 → 새로운 상태 반환
- **초기 상태**: 상태를 초기화할 때 사용할 값
- 반환값: 현재 상태와 상태를 **업데이트**하는 `dispatch` 함수.

### 2. 사용 방법

### 2.1. Reducer 함수 정의

```jsx
function reducer(state, action) {
  switch (
    action.type // 액션타입 : 상태 변화의 유형을 명확하게 식별
  ) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
```

### 2.2. `useReducer` 사용

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

### 3. 사용 시점

- 복잡한 상태 로직 관리
- 여러 액션에 의해 업데이트되는 상태 관리
- Redux와 유사한 패턴 선호 시

### 4. 장점

- 명확한 상태 업데이트 로직
- 확장성 높은 상태 관리
- 간단한 상태 관리 가능

### 5. 단점

- 간단한 상태에는 `useState`가 더 적합할 수 있음
- 처음 사용하는 개발자에게는 복잡하게 느껴질 수 있음

---

### 예제: `Counter` 컴포넌트에서 `useReducer` 사용하기

### 기존 코드 (`useState` 사용)

```jsx
import React, { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => setNumber((prev) => prev + 1)}>+1</button>
      <button onClick={() => setNumber((prev) => prev - 1)}>-1</button>
    </div>
  );
}
```

### `useReducer`를 사용한 코드

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
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
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );

```

### `App` 컴포넌트에서 `useReducer` 적용하기

1. 초기 상태 및 reducer 함수 정의
2. `App` 컴포넌트에서 상태를 `useReducer`로 관리하고 비구조화 할당을 통해 필요한 값을 전달
3. 사용자 입력 처리 및 상태 업데이트를 위한 `onChange` 함수를 구현

```jsx
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ... 사용자 입력 처리 및 상태 업데이트 로직
}
```

---

### `useState` vs `useReducer`

#### 언제 어떤 것을 사용할까?

`React`에서 상태 관리를 할 때 가장 많이 사용하는 두 가지 훅이 바로 **`useState`**와 **`useReducer`**입니다. 이 두 훅은 상태를 관리하는 방법에 차이가 있지만, 상황에 맞게 적절히 선택하면 매우 유용합니다.

#### 1. **`useState`와 `useReducer`의 차이점**

- **`useState`**: 단순한 상태 관리에 적합합니다. 상태가 **하나** 또는 **간단한 구조**일 때 사용하기 좋습니다.
- **`useReducer`**: 복잡한 상태를 관리하거나 상태 변화 로직이 복잡할 때 유용합니다. **다양한 상태**와 **여러 가지 액션**을 처리할 때 사용합니다.

#### 2. **`useState` 사용 시점**

`useState`는 **간단한 상태**를 관리할 때 가장 적합합니다. 상태가 단일 값이거나, 단순히 몇 개의 상태 값을 관리하는 경우입니다.

#### **언제 `useState`를 사용할까?**

- 관리할 상태가 **하나**거나 **간단한 구조**일 때
- 상태 변화 로직이 **복잡하지 않은** 경우
- 상태가 **숫자, 문자열, boolean** 등 **단순한 데이터 타입**일 때

##### **예시**: 간단한 상태 관리

```jsx
const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
}

function decrement() {
  setCount(count - 1);
}
```

여기서는 단순히 숫자 값을 증가하거나 감소시키는 상태를 관리하고 있기 때문에 `useState`가 적합합니다. 상태가 하나뿐이고, 변경 로직도 간단하기 때문입니다.

#### 3. **`useReducer` 사용 시점**

`useReducer`는 **복잡한 상태**나 **다양한 액션**을 처리할 때 적합합니다. 여러 상태 값을 관리하거나 상태 변화 로직이 복잡할 때, `useReducer`는 더 나은 선택이 될 수 있습니다.

#### **언제 `useReducer`를 사용할까?**

- 관리해야 할 **상태가 여러 개**일 때 (상태의 구조가 복잡할 때)
- 상태 변화 로직이 **복잡하거나** **여러 상태를 동시에 변경**해야 할 때
- **여러 종류의 액션**(상태 변화 종류)이 존재할 때

##### **예시**: 복잡한 상태 관리

```jsx
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_STEP":
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

function increment() {
  dispatch({ type: "INCREMENT" });
}

function decrement() {
  dispatch({ type: "DECREMENT" });
}

function setStep(step) {
  dispatch({ type: "SET_STEP", payload: step });
}
```

이 예시에서는 `count`와 `step`이라는 두 가지 상태를 관리하고, 다양한 액션을 통해 상태를 변경하고 있습니다. 여러 상태 값과 상태 변화 로직이 복잡해지면서 `useReducer`가 더 적합한 선택입니다.

#### 4. **`useState`와 `useReducer` 비교 요약**

| **특징**           | **`useState`**                                      | **`useReducer`**                                      |
| ------------------ | --------------------------------------------------- | ----------------------------------------------------- |
| **상태 관리 대상** | 단일 상태 또는 단순한 상태                          | 여러 상태 또는 복잡한 상태                            |
| **상태 변화 로직** | 단순한 상태 변경 (setter 함수로 직접 상태 업데이트) | 복잡한 상태 변경 (리듀서 함수로 상태 업데이트)        |
| **액션 처리**      | 단순한 상태 변화 처리                               | 여러 종류의 액션 처리 가능                            |
| **코드 구조**      | 간단하고 직관적인 코드                              | 상태 변화 로직을 명확히 구분하고 체계적으로 관리 가능 |
| **사용 예시**      | 카운터, 토글, 입력 값 등 단순한 상태                | 다양한 상태를 포함한 복잡한 UI 상태 관리              |

#### 5. **결정 기준**

- **단순한 상태일 때**: 값이 하나이거나 간단하게 상태를 관리할 때는 `useState`를 사용하는 것이 좋습니다. 예를 들어, 숫자, 문자열, boolean 등 간단한 상태일 경우 `useState`가 더 직관적입니다.
  **예시**: 단일 값 관리
  ```jsx
  javascript
  코드 복사
  const [value, setValue] = useState(true);

  ```
- **복잡한 상태와 여러 액션일 때**: 상태의 구조가 복잡해지거나 상태를 변경하는 방식이 다양한 경우 `useReducer`를 사용하는 것이 적합합니다. 예를 들어, 여러 상태를 동시에 업데이트해야 하거나, 상태 변경 로직이 복잡할 때 `useReducer`가 더 효율적입니다.
  **예시**: 복잡한 상태와 여러 액션 처리
  ```jsx
  javascript
  코드 복사
  const [state, dispatch] = useReducer(reducer, initialState);

  ```

#### 6. **`useReducer`가 필요할 때의 고민**

상태 관리가 복잡해지면, `useState`로 상태를 관리하는 것이 불편해질 수 있습니다. 특히 아래와 같은 상황에서는 `useReducer`를 고려해볼 수 있습니다:

- **`setState`를 여러 번** 호출해야 하는 상황
- **여러 개의 상태 값**을 동시에 관리해야 하는 경우
- 상태 변경 로직이 **복잡**하거나 **여러 액션을** 처리해야 하는 경우

예를 들어, `useState`를 사용할 때 한 함수에서 상태를 여러 번 업데이트해야 한다면, 이를 하나의 `reducer`로 묶는 것이 더 효율적일 수 있습니다.

```jsx
javascript
코드 복사
setUsers(users => users.concat(user));
setInputs({
  username: '',
  email: ''
});

```

이처럼 여러 상태를 다루는 상황이 반복되면 `useReducer`로 전환해 구조를 단순화할 수 있습니다.

#### 7. **결론**

- **단순한 상태 관리**에는 `useState`가 적합합니다.
- **복잡한 상태 관리**나 **다양한 상태 변화 로직**이 필요한 경우에는 `useReducer`가 더 나은 선택입니다.
- 상태 관리의 복잡도에 따라 어떤 방식이 더 적합한지 결정할 수 있으며, 상황에 따라 두 훅을 자유롭게 선택하고 조합할 수 있습니다.
