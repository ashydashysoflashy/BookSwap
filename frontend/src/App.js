import { BrowserRouter, Routes, Route} from 'react-router-dom';

//Pages
import Home from './pages/Home';
import CreateAd from './pages/CreateAd';
import Browse from './pages/Browse';

//Components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<CreateAd />}/>
            <Route path='/browse' element={<Browse />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
