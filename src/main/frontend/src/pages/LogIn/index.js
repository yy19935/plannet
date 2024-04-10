import React from 'react';
import styled from 'styled-components';

export const Index = () => {


  function KakaoLoginButton() {
    // 카카오 로그인 요청을 보내는 함수
    const handleKakaoLogin = () => {
        // 카카오 로그인 실행
        window.Kakao.Auth.login({
            success: function (authObj) {
                // 로그인 성공 시 카카오에서 제공하는 인증 코드를 얻음
                const code = authObj.code;

                // 카카오 로그인 요청을 백엔드로 보냄
                fetch(`/kakaoLogin?code=${code}`)
                    .then(response => {
                        if (response.ok) {
                            // 로그인 성공 시 추가 작업 수행 (예: 리다이렉트)
                            window.location.href = '/';
                        } else {
                            // 로그인 실패 시 에러 처리
                            console.error('로그인 실패:', response.statusText);
                        }
                    })
                    .catch(error => {
                        console.error('네트워크 에러:', error);
                    });
            },
            fail: function (err) {
                // 카카오 로그인 실패 시 처리
                console.error('카카오 로그인 실패:', err);
            },
        });
    };}

  return (
    <LoginStyle>
      <Center>
        <Title>
          Sign-up
        </Title>
        <Text>sign up with social account</Text>
        <LoginButton >Google Login</LoginButton>
        <NaverButton>Naver Login</NaverButton>
        <KakaoButton onClick={KakaoLoginButton}>Kakao Login</KakaoButton>
      </Center>
    </LoginStyle>
  );
}

export default Index;

const LoginStyle = styled.div`
  margin-top: 70px;
`;

const Title = styled.h1`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 50px;
  color: #1c1c1c;

`;
const Text = styled.span`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: #1c1c1c;
  margin-bottom: 50px
`;

const Center = styled.div`
  padding-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
`;

const LoginButton = styled.button`
  margin: 8px;
  width: 400px;
  height: 55px;
  border-radius: 80px;
  background-color: #1c1c1c; 
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: #F2F3ED;
  cursor: pointer;
  box-shadow: 0px 8px 13px rgba(0, 0, 0, .5); /* 그림자 추가 */
  border-width: 0;

  &:hover {
    background-color: #383838
  }
`;
const NaverButton = styled.button`
  margin: 8px;
  width: 400px;
  height: 55px;
  border-radius: 80px;
  background-color: #1c1c1c;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: #03c75a;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, .5);
  border-width: 0;

  &:hover {
    background-color: #383838
  }
`;
const KakaoButton = styled.button`
  margin: 8px;
  width: 400px;
  height: 55px;
  border-radius: 80px;
  background-color: #1c1c1c;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: #fef01b;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, .5); /* 그림자 추가 */
  border-width: 0;

  &:hover {
    background-color: #383838
  }
`;

