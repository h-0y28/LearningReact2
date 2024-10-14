# 배열 요소 수정 - 단계별 정리

#### 1단계: `active` 속성 추가

#### 개념 설명:

- **객체의 속성**: JavaScript에서 객체는 여러 개의 속성을 가질 수 있으며, 각 속성은 키-값 쌍으로 이루어져 있습니다. 여기서
- `active` : 사용자의 활성 상태를 나타냅니다. true는 활성화 상태, false는 비활성화 상태를 의미합니다.

```jsx
const [users, setUsers] = useState([
  {
    id: 1,
    username: "velopert",
    email: "public.velopert@gmail.com",
    active: true, // active 속성 추가
  },
  {
    id: 2,
    username: "tester",
    email: "tester@example.com",
    active: false, // active 속성 추가
  },
  {
    id: 3,
    username: "liz",
    email: "liz@example.com",
    active: false, // active 속성 추가
  },
]);
```

---

#### 2단계: 색상 변경 및 커서 스타일 설정

#### 개념 설명:

- **스타일링**: React에서는 인라인 스타일을 사용하여 요소의 CSS 스타일을 직접 지정할 수 있습니다. `cursor` 속성은 마우스 포인터의 모양을 변경하는 데 사용되며, `color` 속성은 텍스트의 색상을 변경합니다.

```jsx
function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: "pointer", // 마우스 커서를 손가락 모양으로 변경
          color: user.active ? "green" : "black", // active 값에 따라 색상 변경
        }}
        onClick={() => onToggle(user.id)} // 클릭 시 onToggle 호출
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}
```

---

#### 3단계: `onToggle` 함수 구현

#### 개념 설명:

- **상태 업데이트**: `setUsers` 함수는 `users` 배열의 상태를 업데이트합니다. `map` 메서드는 배열의 각 요소를 변환하여 새로운 배열을 생성하는 데 사용됩니다. 각 사용자 객체의 `active` 속성을 반전시키기 위해 spread operator(`...`)를 사용하여 기존 객체를 복사하고, `active` 값을 변경합니다.

```jsx
const onToggle = (id) => {
  setUsers(
    users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    )
  );
};
```

---

#### 4단계: `UserList` 컴포넌트에 `onToggle` 전달

#### 개념 설명:

- **props**: React에서 부모 컴포넌트가 자식 컴포넌트에 데이터를 전달할 때 사용하는 방법입니다. `onToggle` 함수를 `UserList` 컴포넌트에 전달하여 자식 컴포넌트에서 호출할 수 있도록 합니다.

```jsx
<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
```

---

#### 5단계: `UserList`에서 `onToggle` 사용

#### 개념 설명:

- **컴포넌트 간 데이터 흐름**: React에서는 데이터가 부모에서 자식으로 흐릅니다. `UserList` 컴포넌트에서 `onToggle` 함수를 각 `User` 컴포넌트에 전달하여 사용자가 클릭할 때 `onToggle`을 호출할 수 있게 합니다.

```jsx
function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle} // onToggle 전달
        />
      ))}
    </div>
  );
}
```
