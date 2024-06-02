import React, { useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside'
import styled from 'styled-components'
import './modal.css'
import { RiCloseLargeLine } from "react-icons/ri";


const CreatingStudyGroupModal = ({ setModalOpen, id, groupName, groupDesc, nickname, readCnt, memberCnt }) => {
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
                <span>{groupName}</span>
              </div>

              <div className='group-explain'>
                <span>{groupDesc}</span>
              </div>

              <div className='groupInfo'>
                <div className='groupLeaderName'>
                  <span>{nickname}</span>
                </div>

                <div className='memberCount'>
                  <span>{readCnt} / {memberCnt}</span>
                </div>
              </div>

              <div className='buttons'>
                <button>가입신청</button>
              </div>
            </div>
      
          
        </div>
      </div>
    </div>
  )
}
export default CreatingStudyGroupModal


