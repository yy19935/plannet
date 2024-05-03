// Nav 컴포넌트
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Nav = () => {
  const { pathname } = useLocation();
  const { user } = useContext(UserContext); // UserContext에서 user 정보 가져오기


  

  return (
    <NavWrapper>
      <Logo src='/images/earth.png'></Logo>
      <Menu onClick={() => (window.location.href = "main")}>Main</Menu>
      <Menu onClick={() => (window.location.href = "studygroup")}>StudyGroup</Menu>
      {pathname === '/' || pathname === '/login'
        ? <Login onClick={() => (window.location.href = "login")}>Login</Login>
        : <ProfileBox>
           <ProfileImage src={user && user.file ? user.file : '/images/pearl.png'} />
            <DropDown>
              
            <li>{user.nickname}</li>
              <li>My page</li>
              <li>Sign Out</li>
              <li onClick={() => (window.location.href = "profileedit")}>회원정보 수정</li>
            </DropDown>
          </ProfileBox>
      }
    </NavWrapper>
  );
};

export default Nav;


const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
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

const Logo = styled.img`
cursor: pointer;
margin-top: 15px;
width: 65px;
text-align: center;
margin-right: 14px;


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
const DropDown = styled.ul`
  position: absolute;
  top: 63px;
  right: 20px;
  background: #ecebe4;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /30%) 0px 0px 7px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 140px;
  height: 150px;
  opacity: 0;
`
const ProfileBox = styled.div`
  display: flex;
  align-items: center; /* 내부 요소를 세로 중앙 정렬 */
  margin-left: auto; /* 로그인 메뉴를 오른쪽 끝에 위치시킴 */
  margin-top: 15px;
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`
const ProfileImage = styled.img`
  width: 54px;
  height: 54px; 
`;
