import { BrowserRouter, Routes, Route} from 'react-router-dom';

//Pages
import Home from './pages/Home';
import CreateAd from './pages/CreateAd';
import Browse from './pages/Browse';

//Components
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from "./pages/HomePage";
import ListingPage from './pages/ListingPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/browse' element={<Browse />}/>
              <Route path='/login' element={<LoginPage />}/>
              <Route path='/register' element={<RegisterPage />}/>
              <Route path='/create' element={<CreateAd />}/>
              <Route path = '/listings/:id' element={<ListingPage/>}/>
              <Route path = '/search' element={<SearchPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
