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
      case '전체보기':
        value = 'ALL_VIEW';
        break;
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
    setSelectItem(value);
    setIsOpen(false);
  };


  const { user } = useContext(UserContext);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [memberCnt, setMemberCnt] = useState('');
  const handleSumbmit = async (e) => {
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

            <p>그룹명: </p>
            <input
              placeholder='그룹명을 입력하세요.'
              onChange={(e) => { setGroupName(e.target.value) }}
            />

            <Dropdown>
              <DropdownButton onClick={toggleDropdown}>
                {selectItem ? selectItem : '과목별'}
              </DropdownButton>
              {isOpen && (
                <DropdownList>
                  <p onClick={() => menuClick('전체보기')}>전체보기</p>
                  <p onClick={() => menuClick('취업')}>취업</p>
                  <p onClick={() => menuClick('입시')}>입시</p>
                  <p onClick={() => menuClick('국가고시')}>국가고시</p>
                  <p onClick={() => menuClick('자격증')}>자격증</p>
                  <p onClick={() => menuClick('IT')}>IT</p>
                </DropdownList>
              )}
            </Dropdown>

            <p>그룹 설명
              <input
                placeholder='어떤 스터디그룹인지 표현해주세요.'
                onChange={(e) => { setGroupDesc(e.target.value) }}
              />
            </p>

            <p>그룹 정원</p>
            <input
              placeholder='최대 정원'
              onChange={(e) => { setMemberCnt(e.target.value) }}
            />

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
width: 180px;
height: 45px;
background-color: #1c1c1c;
box-shadow: 0px 8px 13px rgba(0, 0, 0, .2); /* 그림자 추가 */

font-family: "Pretendard-Regular";
font-size: 18px;
color: #F2F3ED;

&:hover {
  background-color: #383838;
}
`
const DropdownList = styled.ul`
position: absolute;
top: 100%;
left: 0;
z-index: 10;
min-width: 160px;
background-color: #ffffff;
border: 1px solid #ccc;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
padding: 0;
margin: 0;
`
