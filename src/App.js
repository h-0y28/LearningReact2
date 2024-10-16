import React, { useRef, useReducer, useMemo, useCallback } from "react";
import UserList from "./UserList"; // 사용자 목록을 표시하는 컴포넌트
import CreateUser from "./CreateUser"; // 새로운 사용자를 생성하는 컴포넌트

// 활성 사용자 수를 세는 함수
function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length; // active가 true인 사용자만 필터링
}

// 애플리케이션의 초기 상태 정의
const initialState = {
  inputs: {
    username: "", // 사용자의 이름을 입력받는 필드
    email: "", // 사용자의 이메일을 입력받는 필드
  },
  users: [
    {
      id: 1,
      username: "velopert", // 사용자 이름
      email: "public.velopert@gmail.com", // 사용자 이메일
      active: true, // 활성화 상태 (true: 활성, false: 비활성)
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

// 상태(state)와 액션(action)을 받아 상태를 업데이트하는 reducer 함수
function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT": // 입력 필드가 변경되었을 때
      return {
        ...state, // 기존 상태 복사
        inputs: {
          ...state.inputs, // 기존 입력 상태 복사
          [action.name]: action.value, // name에 해당하는 필드의 값을 action.value로 변경
        },
      };
    case "CREATE_USER": // 새로운 사용자를 생성할 때
      return {
        inputs: initialState.inputs, // 입력 필드를 초기 상태로 초기화
        users: state.users.concat(action.user), // 기존 users 배열에 새로운 사용자 추가 (불변성 유지)
      };
    case "TOGGLE_USER": // 사용자의 active 상태를 토글할 때
      return {
        ...state, // 기존 상태 복사
        users: state.users.map((user) =>
          // 주어진 id와 일치하는 사용자의 active 값을 반전시킴
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER": // 사용자를 제거할 때
      return {
        ...state, // 기존 상태 복사
        users: state.users.filter((user) => user.id !== action.id), // 해당 id를 가진 사용자 제외한 배열 반환
      };
    default:
      return state; // 정의되지 않은 action type일 경우 기존 상태 반환
  }
}

// App 컴포넌트
function App() {
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer를 사용하여 상태 관리, useReducer의 두번째 인자 - initialState: 초기 상태
  const nextId = useRef(4); // 새로 추가될 사용자의 id를 관리 (초기값은 4)

  // state에서 users와 inputs를 추출
  const { users } = state;
  const { username, email } = state.inputs;

  // 입력 필드가 변경될 때 호출되는 함수 (name과 value에 따라 상태 업데이트)
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT", // 입력 필드 변경 액션 디스패치
      name,
      value,
    });
  }, []);

  // 새로운 사용자를 생성하는 함수 (현재 입력 필드를 기반으로 새로운 사용자 추가)
  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER", // 사용자 생성 액션 디스패치
      user: {
        id: nextId.current, // 현재 nextId 값으로 id 설정
        username, // 입력된 사용자 이름
        email, // 입력된 사용자 이메일
      },
    });
    nextId.current += 1; // nextId 값을 1 증가시켜 다음 사용자에게 고유 id 부여
  }, [username, email]); // username과 email이 변경될 때만 함수가 재생성

  // 사용자의 active 상태를 토글하는 함수
  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER", // active 상태 토글 액션 디스패치
      id, // 토글할 사용자의 id
    });
  }, []);

  // 사용자를 삭제하는 함수
  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER", // 사용자 삭제 액션 디스패치
      id, // 삭제할 사용자의 id
    });
  }, []);

  // 활성 사용자 수를 계산하는 함수 (users가 변경될 때만 재계산)
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username} // 입력된 사용자 이름 전달
        email={email} // 입력된 사용자 이메일 전달
        onChange={onChange} // 입력 필드 변경 시 호출되는 함수 전달
        onCreate={onCreate} // 새로운 사용자 생성 시 호출되는 함수 전달
      />
      <UserList
        users={users} // 사용자 목록 전달
        onToggle={onToggle} // 사용자 상태 토글 시 호출되는 함수 전달
        onRemove={onRemove} // 사용자 삭제 시 호출되는 함수 전달
      />
      <div>활성사용자 수 : {count}</div> {/* 활성 사용자 수 표시 */}
    </>
  );
}

export default App;
