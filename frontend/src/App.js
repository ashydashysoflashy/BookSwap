import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

//Pages
import CreateAd from './pages/CreateAd';
import UpdateAd from './pages/UpdateAd';
import Browse from './pages/Browse';

//Components
import Navbar from './components/Navbar';
import NavbarLoggedIn from './components/Navbar-LoggedIn';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from "./pages/HomePage";
import ListingPage from './pages/ListingPage';
import SearchPage from './pages/SearchPage';
window.Buffer = window.Buffer || require("buffer").Buffer;
function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
      {loggedIn ? <NavbarLoggedIn /> : <Navbar />}
        <div className='pages'>
          <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/browse' element={<Browse />}/>
              <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn}/>}/>
              <Route path='/register' element={<RegisterPage />}/>
              <Route path='/create' element={<CreateAd />}/>
              <Route path='/update/:id' element={<UpdateAd /> }/>
              <Route path='/home' element={<Browse />}/>
              <Route path = '/listings/:id' element={<ListingPage/>}/>
              <Route path = '/search' element={<SearchPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
