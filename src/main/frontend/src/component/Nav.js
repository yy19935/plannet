import React from 'react';
import styled from 'styled-components';

const Nav = () => {
  return (
    <NavWrapper>
      <Menu onClick={() => (window.location.href = "main")}>Main</Menu>
      <Menu onClick={() => (window.location.href = "studygroup")}>StudyGroup</Menu>
      <Login onClick={() => (window.location.href = "login")}>Login</Login>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #F2F3ED;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 36px;
`;

const Menu = styled.a`
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 30px;
  text-align: center;
  margin-right: 14px; /* 각 메뉴 아이템 사이 간격 조절 */
  color:#1c1c1c;

`;



const Login = styled.a`
  cursor: pointer;
  font-weight: 700;
  font-style: normal;
  font-size: 30px;
  text-align: center;
  margin-right: 14px; /* 각 메뉴 아이템 사이 간격 조절 */
  margin-left: auto; /* 로그인 메뉴를 오른쪽 끝에 위치시킴 */
  color:#1c1c1c;

`;
