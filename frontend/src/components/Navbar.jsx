import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import logo from "../assets/logo_large.png";
import locationIcon from "../assets/location_icon.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import "./Navbar.css";

const Navbar = () => {
  //get the user
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    console.log("logging out");
    await logout();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header>
      <div className="navbar_container">
        <div className="navbar_top">
          <Link to="/">
            <img className="navbar_logo" src={logo} alt="Logo"></img>
          </Link>
          <div className="navbar_search_section">
            <input
              className="navbar_searchbar"
              type="text"
              placeholder="Search for any textbook"
              value={searchQuery}
              onChange={handleSearchChange}
            ></input>

            <button
              className="navbar_search_button"
              onClick={handleSearchSubmit}
            >
              Search
            </button>
            <img src={locationIcon} alt="Location Icon"></img>
            <p id="navbar_location_text">Calgary, AB</p>
          </div>
          <div className="navbar_acc_section">
            {!user && <Link to="/register">Create an Account</Link>}
            {!user && (
              <Link to="/login">
                <button className="navbar_login_button">Log In</button>
              </Link>
            )}
            {user && (
              <button className="navbar_logout_button" onClick={handleLogout}>
                Log Out
              </button>
            )}
          </div>
        </div>
        <div className="navbar_bottom">
          <ul>
            <li>Business</li>
            <li>Computer Science</li>
            <li>Education</li>
            <li>Engineering</li>
            <li>Law</li>
            <li>Mathematics</li>
            <li>Medicine</li>
            <li>Natural Science</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
