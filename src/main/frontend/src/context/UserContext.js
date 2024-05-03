import { createContext, useEffect, useState } from "react";

// 초기 상태값을 정의합니다.
const initialUserState = {
  isMember: false,
  joinDate: null,
  memberNo: null,
  nickname: '',
  snsId: '',
  statusMsg: '',
  withdDate: null
};

// 유저 컨텍스트를 생성합니다.
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);

  const updateUser = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    // 로컬 스토리지에서 유저 정보를 가져옵니다.
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      // 저장된 유저 정보가 있을 경우, JSON 문자열을 파싱하여 상태를 업데이트합니다.
      setUser(JSON.parse(storedUserData));
    }
  }, []); // 페이지가 처음 로드될 때만 실행되어야 합니다.

  useEffect(() => {
    // 유저 정보가 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
