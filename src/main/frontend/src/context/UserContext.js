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
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const updateUser = (userData) => {
    setUser(userData);
  };



  useEffect(() => {
    const storedUserData = localStorage.getItem("userData"); // 로컬스토리지에서 정보 가져오기 getItem
    console.log(storedUserData);
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    } else {
      navigate("/Login");
    }
  }, []);

  // 유저 정보가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser,initialUserState }}>
      {children}
    </UserContext.Provider>
  );
};
