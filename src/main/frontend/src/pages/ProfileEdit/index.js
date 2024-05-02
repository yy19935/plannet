import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { RiSettings4Fill } from "react-icons/ri";

// import './index.css'


const ProfileEdit = () => {
  // 사진등록 미리보기
  const [nickname, setNickname] = useState('');  
  const [statusMsg, setStatusMsg] = useState('');
  const [file, setFile] = useState(); 
  const [previewUrl, setPreviewUrl] = useState('');





  //이미지 업로드
  const onChangeImg = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (e.target.files) {
      const uploadFile = e.target.files[0]
      formData.append('file', uploadFile)
      setFile(uploadFile)



      // 파일을 읽기 위한 FileReader 객체 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      if (uploadFile) {
        reader.readAsDataURL(uploadFile);
      }
    }


  }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    // const memberData = {memberNo: 6, nickname, statusMsg};
    // formData.append('file', file)
    // formData.append('member', JSON.stringify(memberData));
    const memberNo = 6
    formData.append('memberNo', memberNo); 
    formData.append('nickname', nickname);
    formData.append('statusMsg', statusMsg);
    formData.append('file', file)


    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    axios({
      method: 'POST',
      url: `http://localhost:8080/myPage/update`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((result) => { alert('프로필이 업데이트 되었습니다.')
      console.log(result.date)
      navigate('/main');
    })
    .catch ((error) => {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다.');
    })
  };
    

  return (
    <ProfileEditContainer>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='ImageBox'>
            <label htmlFor='fileInput'><RiSettings4Fill /></label>
            {/* 이미지 미리보기 */}
            {previewUrl && <img src={previewUrl} alt='프로필 이미지 미리보기' />}
          </div>

          <input
            type='file'
            style={{ display: 'none' }}
            id='fileInput'
            onChange={onChangeImg}
          />

          <div className='profileBox'>
            <span>닉네임</span>
            <input
              className='nameInput'
              name='nickname'
              maxLength='20'
              placeholder='최대 20자까지 가능'
              onChange={(e) => setNickname(e.target.value)}
            />

            <div>
              <span>프로필 메세지</span>
              <textarea
                maxLength='100'
                name='statusMsg'
                placeholder='프로필 메시지를 입력하세요.(최대 100자)'
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
    top: 7px; /* 이미지 박스 상단에 위치 */
    right: 7px; /* 이미지 박스 왼쪽에 위치 */
    background-color: rgba(255, 255, 255, 0); /* 라벨의 배경색 */
    padding: 5px 10px; /* 라벨의 내부 여백 */
    cursor: pointer; 
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
