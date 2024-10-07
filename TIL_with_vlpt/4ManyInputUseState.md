### 1. 여러 개의 Input 상태 관리하기

- 여러 개의 입력 필드 상태를 관리할 때는 `useState`를 여러 번 사용하거나 각각의 `onChange` 함수를 만드는 대신, 입력 필드에 `name` 속성을 설정하고 이를 참조하여 상태를 업데이트하는 것이 더 좋은 방법

---

### 2. 상태 설정

- 입력 필드의 상태는 객체 형태로 관리
- 예) `name`과 `nickname`을 관리하는 상태를 다음과 같이 설정

```jsx
const [inputs, setInputs] = useState({
  name: "",
  nickname: "",
});
```

---

### 3. 비구조화 할당

- 상태에서 필요한 값을 추출하기 위해 비구조화 할당을 사용

```jsx
const { name, nickname } = inputs; // 비구조화 할당
```

---

### 4. onChange 함수

- `onChange` 함수는 이벤트가 발생할 때 호출되어, 현재 입력값을 상태에 업데이트
- 이벤트 객체에서 `name`과 `value`를 추출하고, 상태를 업데이트할 때는 기존 객체를 복사한 후 변경된 값을 새 객체에 설정

```jsx
const onChange = (e) => {
  const { value, name } = e.target; // name과 value 추출
  setInputs({
    ...inputs, // 기존 객체 복사
    [name]: value, // 변경된 값 설정
  });
};
```

---

### 5. onReset 함수

- `onReset` 함수는 상태를 초기화

```jsx
const onReset = () => {
  setInputs({
    name: "",
    nickname: "",
  });
};
```

---

### 6. 불변성 유지

- 리액트에서 상태를 업데이트할 때는 **불변성을 유지**해야 함
- 직접 상태를 수정하는 대신 새로운 객체를 만들어 업데이트하는 것이 중요 !!

```jsx
setInputs({
  ...inputs, // 기존 객체 복사
  [name]: value, // 변경된 값 설정
});
```

- 이렇게 하면 리액트는 상태 변화가 있음을 감지하고, 필요한 리렌더링을 수행

---

### 7. 성능 최적화

- 리액트 컴포넌트에서 성능 최적화를 위해서는 불변성을 지켜야 하며, 이를 통해 효율적인 업데이트가 가능

---

### 8. 코드 예시

전체 코드 예시:

```jsx
import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  const { name, nickname } = inputs; // 비구조화 할당

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```
