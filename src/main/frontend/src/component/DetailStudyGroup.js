import React, { useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside'
import styled from 'styled-components'
import './modal.css'
import { RiCloseLargeLine } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";


const DetailStudyGroup = ({ setModalOpen, id, groupName, groupDesc, nickname, readCnt, memberCnt, groupCategory }) => {
  const ref = useRef()

  useOnClickOutside(ref, () => {
    setModalOpen(false)
  })

  const getCategoryText = (category) => {
    switch (category) {
      case 'EMP':
        return '취업';
      case 'ENT_EX':
        return '입시';
      case 'STA_EX':
        return '국가고시';
      case 'CERTIFI':
        return '자격증';
      case 'IT':
        return 'IT';

      default:
        return ''; // 기본값 또는 다른 텍스트
    }
  };

  return (
    <div className='presentation' role='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className='modal-close'
          >
            <RiCloseLargeLine />
          </span>

          <div className='modal__content'>
            <div className='group-name'>
              <span>{groupName}</span>
            </div>

            <Container>
              <div className='group-cate'>
                <Text><span>{getCategoryText(groupCategory)}</span></Text>
              </div>
              <IconButton >
                <BookmarkIcon className="icon" />
              </IconButton>
            </Container>
            <div className='group-explain'>
              <span>{groupDesc}</span>
            </div>

            <div className='groupInfo'>
              <div className='groupLeaderName'>
                <Text>그룹장 :<span>{nickname}</span></Text>
              </div>

              <div className='memberCount'>
                <Text>인원 :<span>{readCnt} / {memberCnt}</span></Text>
              </div>
            </div>

            <div className='buttons'>
              <button>가입 신청</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
export default DetailStudyGroup


const Text = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 20px;
  font-weight: 400;
`
const BookmarkIcon = styled(BsBookmark)`
  width: 24px;
  height: 24px;
  color: #333;
  transition: color 0.3s;
`;
const IconButton = styled.button`
background: none;
border: none;
padding: 0;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
}
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between; /* 양끝 정렬 */
`  