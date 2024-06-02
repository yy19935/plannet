import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 초기 상태값을 정의합니다.
const initialUserState = {
  isMember: false,
  joinDate: null,
  memberNo: null,
  nickname: "",
  snsId: "",
  statusMsg: "",
  withdDate: null,
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 로컬 스토리지에서 유저 정보를 불러옵니다.
    const savedUser = sessionStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : initialUserState;
  });

  const updateUser = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    setUser(initialUserState);
    window.location.href = "/login";
  };
  // 유저 정보가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    sessionStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
