import './App.css';
import Nav from './component/Nav';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import ProfileEdit from './pages/ProfileEdit';
import StudyGroup from './pages/StudyGroup';
import Redirect from './pages/Redirect';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import styled from 'styled-components';


const Layout = () => {
  return (
    <div>
      <Wrapper>
        <Nav />
        <Outlet />
      </Wrapper>
    </div>
  );
};

function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="main" element={<Main />} />
            <Route path="studygroup" element={<StudyGroup />} />
            <Route path="login" element={<LogIn />} />
            <Route path="redirect" element={<Redirect />} />
            <Route path="profileEdit" element={<ProfileEdit />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f2f3ed;
  overflow: auto;
`;
