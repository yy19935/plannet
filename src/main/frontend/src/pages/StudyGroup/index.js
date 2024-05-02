import React, { useState } from 'react'
import styled from 'styled-components';
import Pagination from 'react-js-pagination'
import './index.css'
import CreatingStudyGroupModal from '../../component/CreatingStudyGroupModal';


const StudyGroup = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [modalOpen, setModalOpen] = useState(false)


  const [selectItem, setSelectItem] = useState(null)
  const menuClick = (item) => {
    setSelectItem(item)
    setIsOpen(false);
  }




  return (

    <Container>

      <Text>나의 스터디 그룹</Text>
      <BoxContainer1>
        <StudyGroupBox onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox onClick={() => setModalOpen(!modalOpen)} />
      </BoxContainer1>

      <Text>인기 스터디 그룹</Text>
      <BoxContainer1>
        <StudyGroupBox onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox onClick={() => setModalOpen(!modalOpen)} />
      </BoxContainer1>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown>
          <DropdownButton onClick={toggleDropdown}>
            {selectItem ? selectItem : '과목별'}
          </DropdownButton>
          <DropdownList className={isOpen ? "dropdown-content show" : "dropdown-content"}>
            <a href="#" onClick={() => menuClick('Java')}>Java</a>
            <a href="#" onClick={() => menuClick('React')}>React</a>
            <a href="#" onClick={() => menuClick('HTML/CSS')}>HTML/CSS</a>
          </DropdownList>
        </Dropdown>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Plus style={{ marginRight: '10px' }}>+</Plus>
          <GroupSearchInput placeholder='검색' style={{ marginRight: '10px' }} />
          <Search>검색</Search>
        </div>
      </div>


      <BoxContainer2>
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
        <StudyGroupBox2 onClick={() => setModalOpen(!modalOpen)} />
      </BoxContainer2>


      <Pagination
        activePage={1} // 현재 페이지
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={450} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
      // onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
      {modalOpen && <CreatingStudyGroupModal setModalOpen={setModalOpen} />}
    </Container>

  )
}

export default StudyGroup


const Container = styled.div`
  margin-top: 100px;
  padding: 36px;
  font-weight: bold;
  font-size: 20px;

  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropbtn {
    border: 1px solid rgb(37, 37, 37);
    border-radius: 4px;
    background-color: #f5f5f5;
    font-weight: 400;
    color: rgb(37, 37, 37);
    padding: 12px;
    width: 200px;
    text-align: left;
    cursor: pointer;
    font-size: 12px;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    z-index: 1;
    font-weight: 400;
    background-color: #f9f9f9;
    min-width: 200px;
  }
  .dropdown-content.show {
    display: block;
  }
  
  .dropdown-content a {
    display: block;
    text-decoration: none;
    color: rgb(37, 37, 37);
    font-size: 12px;
    padding: 12px 20px;
  }
  
  .dropdown-content a:hover {
    background-color: #ececec;
  }
`;
const BoxContainer1 = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈을 가능하게 함 */
  justify-content: center; /* 요소들을 간격을 둬서 나열 */
`
const StudyGroupBox = styled.div`
  margin: 35px 8px;
  width: 290px;
  height: 180px;
  border-radius: 20px;
  background-color: #1c1c1c;
  flex-shrink: 0;
  flex-wrap: wrap; /* 줄바꿈을 가능하게 함 */

`
const BoxContainer2 = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈을 가능하게 함 */
  margin-bottom: 20px;
  justify-content: center; /* 요소들을 간격을 둬서 나열 */
`
const StudyGroupBox2 = styled.div`
  margin: 30px 28px;
  width: 290px;
  height: 180px;
  border-radius: 20px;
  background-color: #1c1c1c;
  flex-shrink: 0;
  flex-wrap: wrap; /* 줄바꿈을 가능하게 함 */

`
const Text = styled.div`

`



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


font-size: 15px;
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


const GroupSearchInput = styled.input`
width: 300px;
height: 45px;
border-radius: 15px;
border: none;
`
const Plus = styled.div`
cursor: pointer;
`

const Search = styled.button`
border-radius: 80px;
cursor: pointer;
border-width: 0;
width: 80px;
height: 45px;
background-color: #1c1c1c;
box-shadow: 0px 8px 13px rgba(0, 0, 0, .2); /* 그림자 추가 */


font-size: 15px;
color: #F2F3ED;

&:hover {
  background-color: #383838;
}
`