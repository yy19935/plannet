import React, { useContext, useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import styled from 'styled-components';
import './modal.css';
import { RiCloseLine } from "react-icons/ri"; // 아이콘 임포트 경로 수정
import { UserContext } from '../../../frontend/src/context/UserContext';
import axios from 'axios';

const CreateStudyGroup = ({ setCreateStudyGroup }) => {
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setCreateStudyGroup(false);
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(null);

  const toggleDropdown = (event) => {
    event.preventDefault(); // 기본 동작 방지
    setIsOpen(prevState => !prevState);
  };

  const menuClick = (option) => {
    let value;
    switch (option) {
      case '취업':
        value = 'EMPLOY';
        break;
      case '입시':
        value = 'ENT_EX';  // '입시' 선택 시 'ENT_EX'로 설정
        break;
      case '국가고시':
        value = 'NAT_EXAM';
        break;
      case '자격증':
        value = 'CERT';
        break;
      case 'IT':
        value = 'IT';
        break;
      default:
        value = '';
    }
    setSelectItem(option);
    setIsOpen(false);
  };


  const { user } = useContext(UserContext);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [memberCnt, setMemberCnt] = useState('');
  const handleSumbmit = async (e) => {
    if (!groupName || !groupDesc || !selectItem || !memberCnt) {
      e.preventDefault()
      alert('모든 필수 항목을 입력해주세요.') 
      return;
    }

    if (memberCnt <= 0 || memberCnt >= 100) {
      e.preventDefault()
      alert('그룹 정원은 1에서 99 사이여야 합니다.');
      return;
    }
    const formData = new FormData()
    const memberNo = user.memberNo
    formData.append('memberNo', memberNo);
    formData.append('groupName', groupName);
    formData.append('groupDesc', groupDesc);
    formData.append('groupCategory', selectItem)
    formData.append('memberCnt', memberCnt)
    console.log(memberNo)
    console.log(groupName)
    

    axios({
      method: 'POST',
      url: `http://localhost:8080/studyGroup/write`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }




  return (
    <div className='presentation' role='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span
            onClick={() => setCreateStudyGroup(false)}
            className='modal-close'
          >
            <RiCloseLine />
          </span>

          <form className='modal__content' onSubmit={handleSumbmit} >
            <h2>스터디 그룹 만들기</h2>
            <Container>
              <Text>그룹명</Text>
              <Input
                placeholder='그룹명을 입력하세요.'
                onChange={(e) => { setGroupName(e.target.value) }}
                
              />

              <Dropdown>
                <DropdownButton onClick={toggleDropdown}>
                  {selectItem ? selectItem : '과목별'}
                </DropdownButton>
                {isOpen && (
                  <DropdownList>
                    <p style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => menuClick('취업')}>취업</p>
                    <p style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => menuClick('입시')}>입시</p>
                    <p style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => menuClick('국가고시')}>국가고시</p>
                    <p style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => menuClick('자격증')}>자격증</p>
                    <p style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => menuClick('IT')}>IT</p>
                  </DropdownList>
                )}
              </Dropdown>
            </Container>



            <Text>그룹 설명</Text>
            <BigInput
                placeholder='어떤 스터디그룹인지 표현해주세요.'
                onChange={(e) => { setGroupDesc(e.target.value) }}
              />

            <Text>그룹 정원
            <Input
              placeholder='최대 정원'
              onChange={(e) => { setMemberCnt(e.target.value) }}
            />
            </Text>

            <div className='buttons'>
              <button type='submit'>가입신청</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CreateStudyGroup;

const Dropdown = styled.li`
position : relative;
display : flex;

`;
const DropdownButton = styled.button`
position : relative;
display : inline-block;
border-radius: 80px;
cursor: pointer;
border-width: 0;
width: 120px;
height: 45px;
background-color: #ffffff;


font-family: "Pretendard-Regular";
font-size: 16px;
color: #383838;

&:hover {
  background-color: #f0efed;
  color: #383838;
}
`
const DropdownList = styled.ul`
position: absolute;
top: 100%;
z-index: 10;
width: 120px;
background-color: #ffffff;
border: 1px solid #ccc;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
padding: 0;
margin: 0;
font-size: 16px;
`
const Container = styled.div `
  display: flex;
  align-items: center;  // 상하 중앙 정렬
`
const Input = styled.input`
margin: 0 18px;
width: 380px;
height: 35px;
border-radius: 15px;
border: none;
`
const BigInput = styled.textarea`
width: 600px;
height: 130px;
border-radius: 15px;
border: none;
resize: none; // 사용자가 크기를 변경하지 못하게 함
padding: 15px; // 텍스트와 경계 사이의 여백
box-sizing: border-box; // 패딩과 보더를 전체 크기에 포함
`

const Text = styled.p `
font-size: 20px;
margin: 15px 0;
`
