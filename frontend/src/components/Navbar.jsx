import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import logo from "../assets/logo_large.png";
import locationIcon from "../assets/location_icon.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import useOutsideClick from "../hooks/useOutsideClick";

import "./Navbar.css";

const Navbar = () => {
  //get the user
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  // Mobile menu closed when clicking menu item
  const closeMenu = () => setIsMenuOpen(false);
  useOutsideClick(menuRef, closeMenu); // Close menu when clicking outside

  // Fix issue with Mobile Menu staying open
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    closeMenu(); // Close menu after logging out
  };

  const handleSearchSubmit = () => {
    // Construct the search URL based on whether there's a query or not
    const searchURL = searchQuery.trim()
      ? `/search?query=${encodeURIComponent(searchQuery.trim())}`
      : "/search";
    navigate(searchURL);
  };

  function keyboardHandler(e) {
    const input = document.getElementById("navbar_logged_out_search")
    if (input.contains(e.target) && e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  useEffect(() => {
    // Close the menu whenever the location changes
    setIsMenuOpen(false);
  }, [location]); // This useEffect is specifically for handling location changes

  useEffect(() => {
    document.addEventListener('keydown', keyboardHandler)
    return () => { document.removeEventListener('keydown', keyboardHandler) }
  })

  return (
    <header>
      <div className="navbar_container">
        <div className="navbar_top">
          <Link to="/">
            <img className="navbar_logo" src={logo} alt="Logo"></img>
          </Link>

          {/* Hamburger Menu Button */}
          <button className="hamburger_menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>

          {/* Conditionally render mobile menu options */}
          {isMenuOpen && (
              <div className="mobile_menu_options">
                {!user && <Link to="/login" onClick={closeMenu}>Log In</Link>}
                {!user && <Link to="/register" onClick={closeMenu}>Create an Account</Link>}
                <Link to="/search" onClick={closeMenu}>View Listings</Link>
              </div>
          )}

          <div className="navbar_search_section">
            <input
              id="navbar_logged_out_search"
              className="navbar_searchbar"
              type="text"
              placeholder="Search for any textbook"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
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
        {/* Bottom Navbar */}
        <div className={`navbar_bottom ${window.innerWidth <= 768 && isMenuOpen ? 'show' : ''}`}>
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
