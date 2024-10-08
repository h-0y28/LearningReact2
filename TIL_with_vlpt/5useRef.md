### `useRef`로 특정 DOM 선택하기

리액트에서 **DOM 요소에 접근**해야 할 때 `useRef` ⇒ 특정 DOM 요소를 선택하고 조작
→ JS에서 `getElementById`나 `querySelector`와 같은 DOM 선택기를 사용하는 것과 유사

---

### 1. `useRef`란?

- 리액트의 Hook, 컴포넌트가 렌더링될 때 참조 생성 및 이 참조를 사용하여 DOM 요소 접근을 도움
- **불변성**을 유지하므로, 값이 변경되어도 컴포넌트를 리렌더링 X

---

### 2. `useRef` 사용 방법

1. **Ref 객체 생성**: `useRef`를 호출하여 ref 객체를 생성
2. **DOM 요소에 ref 설정**: 생성한 ref 객체를 원하는 DOM 요소의 `ref` 속성에 할당
3. **DOM 접근**: `ref.current` ⇒ 해당 DOM 요소에 접근 가능

---

### 3. 예제: InputSample 컴포넌트

아래는 `InputSample` 컴포넌트에 `useRef`를 적용한 코드:

```jsx
import React, { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef(); // useRef로 Ref 객체 생성

  const { name, nickname } = inputs; // 비구조화 할당

  const onChange = (e) => {
    const { value, name } = e.target; // name과 value 추출
    setInputs({
      ...inputs, // 기존 객체 복사
      [name]: value, // 변경된 값 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus(); // 초기화 후 이름 input에 포커스
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput} // ref 설정
      />
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

---

### 4. `onReset` 함수의 동작

- 상태를 초기화
- `nameInput.current.focus()`를 호출하여 이름 입력 필드에 포커스를 설정
  - 버튼 클릭 후 즉시 입력 필드에 포커스 ⇒ 사용자 경험 향상

---

### 5. 추가 정보

#### **DOM 조작은 가급적 피하라**

리액트는 가상 DOM을 사용하여 효율적인 렌더링을 수행함
⇒ **직접 DOM을 조작**하는 것을 **피하는 것이 좋음**
but, 필요할 경우 `useRef`를 통해 접근 가능

#### **불변성의 중요성**

상태를 직접 변경하는 것이 아니라 **항상 새로운 객체를 만들어서 업데이트**해야 함
→ 리액트가 변경 사항 감지 및 효율적인 리렌더링에 도움

#### **리액트와 외부 라이브러리**

**외부 라이브러리를** 사용할 사 DOM 요소에 직접 접근해야 하는 경우가 많음 (D3.js, Chart.js, Video.js)
→ 이때 `useRef`가 유용

#### **렌더링 최적화**

리액트는 상태와 props의 변경에 따라 자동으로 리렌더링됨
DOM을 직접 조작 → 위의 최적화가 깨질 수 있음 → 주의
