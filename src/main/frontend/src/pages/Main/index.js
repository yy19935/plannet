import axios from 'axios';
import React, { useEffect } from 'react';

const Index = () => {


  const handleKakaoRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const requestURL = `http://localhost:8080/kakaoLogin?code=${code}`

    axios.get(requestURL)
    .then((response) => {
      // 요청 성공 시 실행할 코드
      console.log('전송');
    })
    .catch((error) => {
      // 요청 실패 시 실행할 코드
      console.error(error);
    });
  }

  return (
    <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />메인 페이지</div>
  );
}

export default Index;
