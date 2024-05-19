import React, { useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside'
import styled from 'styled-components'
import './modal.css'
import { RiCloseLargeLine } from "react-icons/ri";


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
            <RiCloseLargeLine />
          </span>


          <div className='modal__content'>
            <div className='group-name'>
              <span>dd</span>
            </div>

            <div className='group-explain'>
              <span>같이 코딩 공부하실 분 모집합니다! 매주 코딩테스트 문제 2개씩 나가며 코드리뷰를 같이합니다!</span>{" "}
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
            <button>가입신청</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
export default CreatingStudyGroupModal


