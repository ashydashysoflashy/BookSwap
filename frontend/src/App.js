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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
