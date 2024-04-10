import React, { useState } from 'react'
import styled from 'styled-components';
// import './index.css'


const ProfileEdit = () => {

  // 사진등록 미리보기
  const [previewIamage, setPreviewIamage] = useState('')
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewIamage(reader.result)
    }
  }

  return (
    <ProfileEditContainer>
      <div className='container'>
        <form>
          <div className='ImageBox'>
            {previewIamage && (
              <img src={previewIamage} alt='미리보기' />
            )}
            <label htmlFor="fileInput">파일선택</label>
          </div>


          <input type="file" style={{ display: 'none' }} id="fileInput" onChange={handleFileInputChange} />


          <div className='profileBox'>
            <span>닉네임</span>
            <input className='nameInput' maxlength="20" placeholder=' 최대 20자까지 가능' />

            <div>
              <span>프로필 메세지</span>
              <textarea
                maxlength="100"
                placeholder=" 프로필 메시지를 입력하세요.(최대 100자)"
              // value={message}
              // onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">등록하기</button>
        </form>
      </div>

    </ProfileEditContainer>
  )
}



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
