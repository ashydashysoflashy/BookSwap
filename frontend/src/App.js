import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

//Pages
import CreateAd from "./pages/CreateAd";
import UpdateAd from "./pages/UpdateAd";
import Browse from "./pages/Browse";

//Components
import Navbar from "./components/Navbar";
import NavbarLoggedIn from "./components/Navbar-LoggedIn";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import SearchPage from "./pages/SearchPage";
import { useAuthContext } from "./hooks/useAuthContext"
import UserAdsPage from "./pages/UserAdsPage";
window.Buffer = window.Buffer || require("buffer").Buffer;
function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        {user ? <NavbarLoggedIn /> : <Navbar />}
        <div className="pages">
          <Routes>
            <Route path="/" element={!user ? <HomePage /> : <Navigate to='/home'/>} />
            <Route path="/login" element={!user ? <LoginPage/> : <Navigate to='/'/>}/>
            <Route path="/register" element={!user ? <RegisterPage/> : <Navigate to='/'/>}/>
            <Route path="/create" element={user ? <CreateAd /> : <Navigate to='/register'/>} />
            <Route path="/update/:id" element={user ? <UpdateAd /> : <Navigate to='/register'/>} />
            <Route path="/home" element={<Browse />} />
            <Route path="/listings/:id" element={<ListingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/myads" element={user ? <UserAdsPage/> : <Navigate to='/register'/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

