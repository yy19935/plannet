import React from 'react';
import './App.css';
import Nav from './component/Nav';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import ProfileEdit from './pages/ProfileEdit';
import StudyGroup from './pages/StudyGroup';
import Redirect from './pages/Redirect';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
        <Wrapper>
          <Nav />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="main" element={<Main />} />
            <Route path="studygroup" element={<StudyGroup />} />
            <Route path="login" element={<LogIn />} />
            <Route path="redirect" element={<Redirect />} />
            <Route path="profileEdit" element={<ProfileEdit />} />
          </Routes>
        </Wrapper>
    </Router>
    </UserProvider>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #eef0f2;
  overflow: auto;
`;
