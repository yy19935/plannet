// Nav 컴포넌트
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';


const Nav = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(UserContext); // setUser 추가
  const [profileImageSrc, setProfileImageSrc] = useState('/images/pearl.png');


  useEffect(() => {
    if (user) {
      axios({
        method: 'GET',
        url: `http://localhost:8080/myPage/${user.memberNo}`,
      })
        .then((result) => {
          // 프로필 사진 URL을 상태에 저장
          const profileImg = result.data.file.fileName
          setProfileImageSrc(`C:/planNetFile/${profileImg}`);
          console.log(profileImageSrc); // 파일 경로 콘솔에 출력
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const handleMenuClick = (path) => {
    if(!user || user.isMember === false) {
      window.location.href = "login"
    } else {
      window.location.href = path;
    }
  }



  return (
    <NavWrapper>
      <Logo src='/images/earth.png'></Logo>
      <Menu onClick={() => handleMenuClick("main")}>Main</Menu>
      <Menu onClick={() => handleMenuClick("studygroup")}>StudyGroup</Menu>
      {!user || user.isMember === false ? (
        <Login onClick={() => window.location.href = "login"}>Login</Login>
      ) : (
        <ProfileBox>
          <ProfileImage src={profileImageSrc} alt="profile_image" /> {/* 프로필 이미지 경로를 사용 */}
          <DropDown>
            <li>{user.nickname}</li>
            <li onClick={() => window.location.href = "mypage"}>My page</li>
            <li onClick={handleLogout}>Sign Out</li>
            <li onClick={() => window.location.href = "profileedit"}>회원정보 수정</li>
          </DropDown>
        </ProfileBox>
      )}
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
  background-color: #eef0f2;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 36px;

  z-index:100;
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
  top: 56px;
  right: 20px;
  background: #eef0f2;
  border-radius: 3px;
        box-shadow: 
        0px -4px 8px 0px rgba(255, 255, 255, 0.8), /* 상단 흰색 그림자 */
        0px 4px 8px rgba(0, 0, 0, 0.2); /* 하단 검정색 그림자 (일반적인 그림자) */
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 140px;
  height: 150px;
  pointer-events: none;
  opacity: 0;
`
const ProfileBox = styled.div`
  display: flex;
  align-items: center; /* 내부 요소를 세로 중앙 정렬 */
  margin-left: auto; /* 로그인 메뉴를 오른쪽 끝에 위치시킴 */f
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
  border-radius:50%;
`;
