import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

//Pages
import CreateAd from "./pages/CreateAd";
import UpdateAd from "./pages/UpdateAd";
import Browse from "./pages/Browse";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from './pages/NotFoundPage';
import UserAdsPage from "./pages/UserAdsPage";
import OtherUserAdsPage from "./pages/OtherUserAdsPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";



//Components
import Navbar from "./components/Navbar";
import NavbarLoggedIn from "./components/Navbar-LoggedIn";
import BanCheck from "./components/BanCheck"

window.Buffer = window.Buffer || require("buffer").Buffer;
function App() {
  const user = localStorage.getItem('user');

  function DecideNavbar() {
    const url = useLocation();
    if (user) {
      if (url.pathname === '/admin') return null;
      else return <NavbarLoggedIn />;
    }
    else return <Navbar />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <BanCheck />
        {!user ? <Navbar /> : <DecideNavbar />}
        <div className="pages">
          <Routes>
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to='/' />} />
            <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to='/' />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/create" element={user ? <CreateAd /> : <Navigate to='/register' />} />
            <Route path="/update/:id" element={user ? <UpdateAd /> : <Navigate to='/register' />} />
            <Route path="/home" element={<Browse />} />
            <Route path="/listings/:id" element={<ListingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/myads" element={user ? <UserAdsPage /> : <Navigate to='/register' />} />
            <Route path="/userads/:id" element={user ? <OtherUserAdsPage /> : <Navigate to='/register' />} />
            <Route path="/admin" element={user ? <AdminPage /> : <Navigate to='/register' />} />
            <Route path="/" element={!user ? <HomePage /> : <Browse />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

