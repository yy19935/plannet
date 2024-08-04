import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import './index.css'
import DetailStudyGroup from '../../component/DetailStudyGroup';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import CreateStudyGroup from '../../component/CreateStudyGroup';
import { BsBookmark } from "react-icons/bs";



//과목 드롭다운 카테고리 관련
const StudyGroup = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectCate, setSelectCate] = useState('')

  const menuClick = (category) => {
    let filteredData = [];

    switch (category) {
      case '전체보기':
        filteredData = studyGroups;
        setSelectCate('ALL'); 
        break;
      case '취업':
        filteredData = studyGroups.filter(item => item.groupCategory === 'EMP');
        setSelectCate('EMP'); // 선택된 카테고리 업데이트
        break;
      case '입시':
        filteredData = studyGroups.filter(item => item.groupCategory === 'ENT_EX');
        setSelectCate('ENT_EX');
        break;
      case '국가고시':
        filteredData = studyGroups.filter(item => item.groupCategory === 'STA_EX');
        setSelectCate('STA_EX');
        break;
      case '자격증':
        filteredData = studyGroups.filter(item => item.groupCategory === 'CERTIFI');
        setSelectCate('CERTIFI');
        break;
      case 'IT':
        filteredData = studyGroups.filter(item => item.groupCategory === 'IT');
        setSelectCate('IT');
        break;
      default:
        filteredData = studyGroups;
        break;
    }
    setSelectItem(category); // 선택된 카테고리 업데이트
    setFilteredStudyGroups(filteredData); // 필터링된 데이터로 스터디 그룹 상태 업데이트
    setPage(1); // 페이지를 처음으로 설정 (필요에 따라 변경 가능)
    setIsOpen(false)
  };


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const [modalOpen, setModalOpen] = useState(false)
  const [selectItem, setSelectItem] = useState(null)
  const [studyGroups, setStudyGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [page, setPage] = useState(1)
  const itemsCountPerPage = 16
  const [filteredStudyGroups, setFilteredStudyGroups] = useState([]);
  const [createStudyGroup, setCreateStudyGroup] = useState(false);


  //스터디그룹 상세보기(모달) 관련
  const handleGroupClick = (group) => {
    setSelectedGroup(group); // 클릭된 그룹 설정
    setModalOpen(true); // 모달 열기
  };

    //스터디그룹 생성하기(모달) 관련
    const createStudyGroupModal = () => {
      setCreateStudyGroup(true); // 모달 열기
    };


  //스터디그룹 전체 리스트 가져오기 관련
  useEffect(() => {
    axios.get('http://localhost:8080/studyGroup/list?')
      .then((response) => {
        setStudyGroups(response.data);
        setFilteredStudyGroups(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('스터디그룹:', error);
      });
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const getCurrentPageData = () => {
    const startIndex = (page - 1) * itemsCountPerPage;
    const endIndex = startIndex + itemsCountPerPage;
    return filteredStudyGroups.slice(startIndex, endIndex); // 필터링된 데이터 사용
  };

    //스터디그룹 검색관련
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (e) => {
      setSearchValue(e.target.value)
    }
  
    const searchButtonSubmit = (e) => {
      e.preventDefault()
      axios.get(`http://localhost:8080/studyGroup/list?searchType=all&searchValue=${searchValue}`)
      .then((response) => {
        let data = response.data;
        
        // 전체보기('ALL')이 아닐 경우, selectCate에 따라 필터링
        if (selectCate && selectCate !== 'ALL') {
          data = data.filter(item => item.groupCategory === selectCate);
        }
    
        // 필터링된 데이터 설정
        setFilteredStudyGroups(data);
        setPage(1);
      })
        .catch((error) => {
          console.error('검색 오류:', error);
        });
    }

    const handleIconClick = (event) => {
      event.stopPropagation();
      // 모달을 띄우는 코드를 여기에 추가
    };
 
  return (

    <Container>

      <Text>나의 스터디 그룹</Text>
      <BoxContainer1>
        <StudyGroupBox>
          <GroupTitle>수학마스터</GroupTitle>
          <GroupMsg> 그룹설명란입니다 그룹설명 그룹설명란입니다 그룹설명란입니다 그룹설명란입니다 그룹설명란입니다 그룹설명 그룹설명란입니다 그룹설명란입니다 그룹설명란입니다.</GroupMsg>
          <GroupInfo>
            <Profile src='/images/다운로드.jpg' />
            <ProfileName>윤정</ProfileName>
            <Count>정원표기</Count>
          </GroupInfo>
        </StudyGroupBox>
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
            <p onClick={() => menuClick('전체보기')}>전체보기</p>
            <p onClick={() => menuClick('취업')}>취업</p>
            <p onClick={() => menuClick('입시')}>입시</p>
            <p onClick={() => menuClick('국가고시')}>국가고시</p>
            <p onClick={() => menuClick('자격증')}>자격증</p>
            <p onClick={() => menuClick('IT')}>IT</p>
          </DropdownList>
        </Dropdown>

        <form style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }} onSubmit={searchButtonSubmit}>
          <Plus style={{ marginRight: '10px' }} onClick={() => setCreateStudyGroup(!createStudyGroup)}>+</Plus>
          <GroupSearchInput placeholder='검색' style={{ marginRight: '10px' }} onChange={handleSearch} />
          <Search type='submit'>검색</Search>
        </form>
      </div>


      {/* 스터디그룹 전체 리스트 */}
      <AllStudyGroup>
        {getCurrentPageData().map(group => (
          <StudyGroupBox key={group.studyGroupNo} onClick={() => handleGroupClick(group)}>
            <GroupHeader>
              <GroupTitle>{group.groupName}</GroupTitle>
              <IconButton onClick={handleIconClick}>
                <BookmarkIcon className="icon" />
              </IconButton>
            </GroupHeader>
            <GroupMsg>{group.groupDesc}</GroupMsg>
            <GroupInfo>
              <Profile src='/images/pearl.png' />
              <ProfileName>{group.nickname}</ProfileName>
              <Count>{group.readCnt} / {group.memberCnt}</Count>
            </GroupInfo>
          </StudyGroupBox>
        ))}
      </AllStudyGroup>
      <Pagination
          activePage={page}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={filteredStudyGroups.length}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />



      {modalOpen &&
        <DetailStudyGroup
          {...selectedGroup}
          setModalOpen={setModalOpen}
        />
      }

      {createStudyGroup &&
        <CreateStudyGroup
          setCreateStudyGroup={setCreateStudyGroup}
        />
      }
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
  flex-wrap: wrap; 
  justify-content: center; 
`
const StudyGroupBox = styled.div`
  margin: 35px 5px;
  width: 250px;
  height: 180px;
  border-radius: 20px;
  background-color: #FFFFFF;
  flex-shrink: 0;
  flex-wrap: wrap; 
  padding: 15px;
`
const GroupTitle = styled.div`
  margin: 10px 0;
  font-family: "Pretendard-Regular";
  font-weight: 900;
  font-size: 20px;
  white-space: nowrap; /* 텍스트가 한 줄로 유지되게 합니다 */
  overflow: hidden; /* 넘치는 부분을 숨깁니다 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략 부호를 추가합니다 */
`;
const GroupMsg = styled.div`
  font-size: 15px;
  font-family: "Pretendard-Regular";
  font-weight: 400;
  height: 80px;
  overflow: hidden; /* 넘치는 내용을 숨김 */

`
const GroupInfo = styled.div `
display: flex;
align-items: center; /* 세로 중앙 정렬 */
`
const Profile = styled.img`
display: flex;
align-items: center; /* 내부 요소를 세로 중앙 정렬 */
margin-right: auto; /* 로그인 메뉴를 오른쪽 끝에 위치시킴 */
margin: 8px 0 10px 0;
width: 45px;
height: 45px; 
border-radius:50%;
`
const ProfileName = styled.div`
font-size: 15px;
margin: 0 13px;
font-family: "Pretendard-Regular";
font-weight: 600;
`
const Count = styled.div`
font-size: 15px;
font-family: "Pretendard-Regular";
font-weight: 600;
margin-left: auto;
`

const AllStudyGroup = styled.div`
  display: flex;
  flex-wrap: wrap; 
  margin-bottom: 20px;
  justify-content: center; 
`
const StudyGroupBox2 = styled.div`
  margin: 30px 28px;
  width: 290px;
  height: 180px;
  border-radius: 20px;
  background-color: #FFFFFF;
  flex-shrink: 0;
  flex-wrap: wrap;

`
const Text = styled.div`
  font-family: "Pretendard-Regular";
  font-weight: 400;
  
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

font-family: "Pretendard-Regular";
font-size: 18px;
color: #F2F3ED;

&:hover {
  background-color: #383838;
}
`

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px; 
  `

  const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const BookmarkIcon = styled(BsBookmark)`
  width: 24px;
  height: 24px;
  color: #333;
  transition: color 0.3s;
`;