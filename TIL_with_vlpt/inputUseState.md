### 1. **`input` 상태 관리의 개념**

- `input` 태그에서 사용자가 입력한 값을 React에서 관리할 수 있도록, `useState`를 사용해 상태를 저장하고 관리합니다.
- `input`의 값이 변경될 때마다 해당 값을 상태로 업데이트하고, 이를 화면에 반영하거나 초기화할 수 있습니다.

### 2. **기본 `input` 설정**

- 먼저 `InputSample.js` 파일을 생성하고, 기본적인 `input`과 버튼을 렌더링합니다.

**코드 예시:**

```jsx
// InputSample.js
import React from "react";

function InputSample() {
  return (
    <div>
      <input />
      <button>초기화</button>
      <div>
        <b>값: </b>
      </div>
    </div>
  );
}

export default InputSample;
```

### 3. **상태 관리 및 이벤트 처리**

- `useState` 훅을 사용해 `input`의 값을 상태로 관리하고, `onChange` 이벤트로 사용자가 입력한 값을 업데이트합니다.
- `e.target.value`를 사용해 `input` 태그의 현재 값을 가져올 수 있습니다.
- 상태 값을 `setState`로 업데이트하고, 이를 `value` 속성에 설정하면 상태가 변경될 때 `input`의 값도 자동으로 업데이트됩니다.

**코드 예시:**

```jsx
import React, { useState } from "react";

function InputSample() {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value); // input에 입력한 값으로 상태 업데이트
  };

  const onReset = () => {
    setText(""); // 초기화 버튼 클릭 시 input 값 초기화
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b> {/* 입력된 값 출력 */}
      </div>
    </div>
  );
}

export default InputSample;
```

### 4. **`useState`와 `onChange` 이벤트 사용**

- **`useState`**: `text` 상태와 `setText` 상태 업데이트 함수를 사용해 `input` 값을 관리합니다.
- **`onChange` 이벤트**: `onChange` 이벤트 핸들러에서 `e.target.value`를 이용해 `input`에 입력된 값을 가져와 상태를 업데이트합니다.

### 5. **초기화 기능 구현**

- **`onReset`**: 버튼을 클릭했을 때 `onReset` 함수를 호출하여 `text` 상태를 빈 문자열로 초기화합니다.
- 이렇게 하면 `input` 필드도 빈 상태로 업데이트됩니다.

### 6. **상태와 `value` 속성의 연결**

- `input` 태그에 `value` 속성을 설정하여 상태 변화에 따라 `input` 필드의 값이 자동으로 반영됩니다.
- 상태가 변경되면 `input` 필드도 동시에 업데이트되므로 사용자 경험이 일관되게 유지됩니다.

### 7. **정리**

- `input` 상태를 관리할 때는 `useState`를 사용하고, `onChange` 이벤트를 통해 입력 값을 상태로 업데이트합니다.
- `input`의 `value` 속성을 상태와 연결하여 상태가 변경될 때마다 `input` 필드의 값이 자동으로 반영되도록 합니다.
- 초기화 버튼을 클릭하면 상태 값을 빈 문자열로 설정해 `input` 필드를 비울 수 있습니다.
