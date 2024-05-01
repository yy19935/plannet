import React, { useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside'
import styled from 'styled-components'
import './modal.css'
const CreatingStudyGroupModal = ({ setModalOpen }) => {
  const ref = useRef()

  useOnClickOutside(ref, () => {
    setModalOpen(false)
  })

  return (
    <div className='presentation' role='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className='modal-close'
          >
            X
          </span>


          <div className='modal__content'>
            <div className='group-name'>
              <span>StudyGroup name</span>
            </div>

            <div className='group-explain'>
              <span>Write down the description of the group study. 어떤 그룹스터디인지 관련한 설명을 여기에 적습니다. Write down the description of the group study. 어떤 그룹스터디인지 관련한 설명을 여기에 적습니다.</span>{" "}
            </div>

            <div className='groupInfo'>
              <div className='groupLeaderName'>
                <span>그룹장닉네임</span>
              </div>

              <div className='memberCount'>
                <span>1/5</span>
              </div>
            </div>       
          </div>

          <div className='buttons'>
            <button>취소</button>
            <button>가입신청</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
export default CreatingStudyGroupModal


