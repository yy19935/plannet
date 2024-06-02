// Redirect 컴포넌트
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../../component/Nav';
import { UserContext } from '../../context/UserContext';


const Redirect = () => {




  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext); // updateUser 함수 가져오기

  useEffect(() => {
    handleKakaoRedirect();
  }, []);
  

  const handleKakaoRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const requestURL = `http://localhost:8080/kakaoLogin?code=${code}`;
    axios.get(requestURL)
      .then((response) => {
        const userData = response.data;
        updateUser(userData); // userData 상태 업데이트
        sessionStorage.setItem("userData", JSON.stringify(userData))
        navigate('/main');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (


    <div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div> 
  );
};

export default Redirect;