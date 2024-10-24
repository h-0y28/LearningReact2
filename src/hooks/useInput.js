import { useState, useCallback } from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm); // 입력 폼의 상태를 관리
  const onChange = useCallback((e) => {
    const { name, value } = e.target; // 이벤트에서 name과 value 추출
    setForm((form) => ({ ...form, [name]: value })); // 상태 업데이트
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]); // 폼 초기화 함수

  return [form, onChange, reset]; // form, onChange, reset 반환
}

export default useInputs;
