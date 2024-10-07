### 1. `props`?

- **`props`** 는 `properties`의 줄임말
- **컴포넌트에 전달하는 값**
- 부모 컴포넌트 → 자식 컴포넌트 ⇒ 데이터를 전달

### 2. **`props` 사용법**

- **부모 컴포넌트**에서 `props`를 통해 값을 전달합니다.

**예시:**

```jsx
// App.js
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" />;
}

export default App;
```

- **자식 컴포넌트**에서는 `props` 객체를 받아 사용합니다.

**예시:**

```jsx
// Hello.js
import React from "react";

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>;
}

export default Hello;
```

### 3. **여러 `props` 전달**

- 부모 컴포넌트에서 여러 개의 `props`를 전달할 수 있습니다.

**예시:**

```jsx
// App.js
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" color="red" />;
}

export default App;
```

- 자식 컴포넌트에서 `props.color`를 이용해 스타일을 적용할 수 있습니다.

**예시:**

```jsx
// Hello.js
import React from "react";

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>;
}

export default Hello;
```

### 4. **비구조화 할당을 통한 `props` 간결화**

- `props`를 직접 사용할 때마다 `props.`를 작성하는 대신, **비구조화 할당**을 통해 간단하게 사용할 수 있습니다.

**예시:**

```jsx
// Hello.js
import React from "react";

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

export default Hello;
```

### 5. **`defaultProps`로 기본값 설정**

- `props`가 전달되지 않았을 때, 기본값을 설정할 수 있습니다.

**예시:**

```jsx
// Hello.js
import React from "react";

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

Hello.defaultProps = {
  name: "이름없음",
};

export default Hello;
```

**사용 예시:**

```jsx
// App.js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <>
      <Hello name="react" color="red" />
      <Hello color="pink" />
    </>
  );
}

export default App;
```

### 6. **`props.children` 사용**

- 컴포넌트 태그 사이의 내용을 자식 컴포넌트에서 접근하려면 `props.children`을 사용합니다.

**예시:**

```jsx
// Wrapper.js
import React from "react";

function Wrapper({ children }) {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };
  return <div style={style}>{children}</div>;
}

export default Wrapper;
```

**사용 예시:**

```jsx
// App.js
import React from "react";
import Hello from "./Hello";
import Wrapper from "./Wrapper";

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
```

---

## 정리

- `props`는 컴포넌트에게 값을 전달할 때 사용됩니다.
- 여러 개의 `props`를 전달할 수 있으며, 비구조화 할당을 통해 코드를 더 간결하게 작성할 수 있습니다.
- `defaultProps`를 사용하면 기본값을 설정할 수 있고, `props.children`을 사용하여 컴포넌트 사이의 내용을 렌더링할 수 있습니다.
