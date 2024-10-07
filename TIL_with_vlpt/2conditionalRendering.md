### 1. **조건부 렌더링의 개념**

- 조건부 렌더링은 특정 조건에 따라 다르게 결과물을 렌더링하는 방식입니다.
- 예를 들어, 특정 값이 `true`일 때만 요소를 렌더링하거나, 다른 값을 보여줄 수 있습니다.

### 2. **삼항 연산자를 이용한 조건부 렌더링**

- 삼항 연산자는 조건에 따라 두 가지 경우 중 하나를 선택해 렌더링할 때 사용됩니다.

**예시:**

```jsx
jsx
코드 복사
// App.js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true} />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;

```

**삼항 연산자 사용:**

```jsx
jsx
코드 복사
// Hello.js
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial ? <b>*</b> : null}
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음',
};

export default Hello;

```

- `isSpecial` 값이 `true`이면 `<b>*</b>`가 렌더링되고, 그렇지 않으면 `null`이 렌더링됩니다.
- JSX에서 `null`, `false`, `undefined`는 아무것도 렌더링되지 않습니다.

### 3. **`&&` 연산자를 이용한 조건부 렌더링**

- 단순히 조건이 `true`일 때 요소를 렌더링하고, 그렇지 않으면 아무것도 렌더링하지 않을 때는 `&&` 연산자를 사용하는 것이 더 간편합니다.

**예시:**

```jsx
jsx
코드 복사
// Hello.js
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음',
};

export default Hello;

```

- `isSpecial`이 `true`일 때만 `<b>*</b>`가 렌더링되며, `false`일 때는 아무것도 렌더링되지 않습니다.

### 4. **단축 평가 논리 계산법**

- `&&` 연산자의 왼쪽 값이 `true`이면 오른쪽 값을 반환하고, `false`이면 `false`를 반환하는 방식입니다.
- 이 방식은 JSX에서 조건부 렌더링 시 유용하게 사용할 수 있습니다.

### 5. **`props` 생략 시 기본 `true` 값**

- `props`의 값을 생략하고 이름만 작성할 경우, 이는 자동으로 `true`로 설정됩니다.

**예시:**

```jsx
jsx
코드 복사
// App.js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;

```

- `isSpecial`만 작성해도, `isSpecial={true}`와 동일한 의미를 갖습니다.

### 6. **정리**

- 조건부 렌더링은 주어진 조건에 따라 다르게 렌더링할 때 사용합니다.
- 삼항 연산자는 조건에 따라 두 가지 경우를 렌더링할 때, `&&` 연산자는 특정 조건이 `true`일 때만 렌더링할 때 유용합니다.
- `props`의 값을 생략하면 자동으로 `true`로 설정됩니다.
