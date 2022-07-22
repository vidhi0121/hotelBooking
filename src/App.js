import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import AddBooking from './components/AddBooking';
import CheckRoom from './components/CheckRoom';
import SidePanel from './components/SidePanel';
import Home from './components/Home';
import Header from './components/Header';

const PageWrapper = styled.div`
  height:450px;
  width:500px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(27, 37, 86, 0.16);
`
const ContentWrapper = styled.div`
  display:flex; 
`
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <ContentWrapper>
          <SidePanel />
          <PageWrapper>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/addbooking' element={<AddBooking />} />
              <Route path='/check' element={<CheckRoom />} />
            </Routes>
          </PageWrapper>
        </ContentWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
