import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// import './index.css'


const ProfileEdit = () => {

  // 사진등록 미리보기
  const [previewImage, setPreviewImage] = useState('')
  const [nickname, setNickname] = useState('');  
  const [statusMsg, setStatusMsg] = useState('');  

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);  // 데이터 URL을 상태에 저장
      };
    }
  };
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작(페이지 새로고침)을 방지합니다.
  
    try {
      const memberData = {memberNo:1, nickname, statusMsg};
      const formData = new FormData();
      
      formData.append('member', memberData);
      formData.append('file', previewImage); 
  

  
      const postResponse = await axios.post('/mypage/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(postResponse.data);
      alert('프로필이 업데이트 되었습니다.');

      navigate('/');
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  return (
    <ProfileEditContainer>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='ImageBox'>
            {previewImage && <img src={previewImage} alt='미리보기' />}
            <label htmlFor='fileInput'>파일선택</label>
          </div>

          <input
            type='file'
            style={{ display: 'none' }}
            id='fileInput'
            onChange={handleFileInputChange}
          />

          <div className='profileBox'>
            <span>닉네임</span>
            <input
              className='nameInput'
              name='nickname'
              maxLength='20'
              placeholder='최대 20자까지 가능'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <div>
              <span>프로필 메세지</span>
              <textarea
                maxLength='100'
                name='statusMsg'
                placeholder='프로필 메시지를 입력하세요.(최대 100자)'
                value={statusMsg}
                onChange={(e) => setStatusMsg(e.target.value)}
              />
            </div>
          </div>

          <button type='submit'>등록하기</button>
        </form>
      </div>
    </ProfileEditContainer>
  );
};



export default ProfileEdit

const ProfileEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 50px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 10px;
  }

  label {
    position: absolute;
    top: 0; /* 이미지 박스 상단에 위치 */
    left: 0; /* 이미지 박스 왼쪽에 위치 */
    background-color: rgba(255, 255, 255, 0); /* 라벨의 배경색 */
    padding: 5px 10px; /* 라벨의 내부 여백 */
  }

  .profileBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 260px;
    padding: 10px;
  }

  span {
    display: flex;
    align-items: center;
    margin: 10px;
    justify-content: flex-start;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    font-weight: bold;
  }

  .nameInput {
    width: 240px;
    height: 35px;
    margin-left: 10px;
    margin-bottom: 20px;

    border-radius: 15px;
    border: none;

  }

  textarea {
    width: 240px;
    height: 150px;
    margin-left: 10px;
    resize: none;

    border-radius: 15px;
    border: none;
  }

  .ImageBox {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: #d3d4cb;
    border-radius: 35px;
    margin: 60px auto 0;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
      border-radius: 35px;
    }
  }

  button {
    margin: 8px;
    width: 150px;
    height: 45px;
    border-radius: 80px;
    background-color: #1c1c1c;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 15px;
    color: #d3d4cb;
    cursor: pointer;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, .5);
    border-width: 0;
  
    &:hover {
      background-color: #383838
    }
  }
`;
