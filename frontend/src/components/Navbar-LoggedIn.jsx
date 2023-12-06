import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import logo from '../assets/logo_large.png'
import locationIcon from '../assets/location_icon.png'

import './Navbar.css'
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useLogout();
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const { user } = useAuthContext();
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [admin, setAdmin] = useState()
  const [adminFetched, setAdminFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/isAdmin/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setAdmin(data);
          setAdminFetched(true)
        } else {
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    window.location.reload(); // This will reload the page
    console.log('User logged out');
    navigate('/');
  };

  const handleSearchSubmit = () => {
    const searchURL = searchQuery.trim()
      ? `/search?query=${encodeURIComponent(searchQuery.trim())}`
      : "/search";
    navigate(searchURL);
  };

  /* Handle clicks around toggle for user account so toggle button is hidden */
  const handleClickOutside = (event) => {
    // If the click is outside the dropdown, close it
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleLinkClick = () => {
    setShowDropdown(false); // Close the dropdown when a link is clicked
  };

  function keyboardHandler(e) {
    const input = document.getElementById("navbar_logged_in_search")
    if (input.contains(e.target) && e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyboardHandler)
    return () => { document.removeEventListener('keydown', keyboardHandler) }
  })

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);


  return (
    <header>
      <div className="navbar_container">
        <div className="navbar_top">
          <Link to="/"><img className='navbar_logo' src={logo} alt='Logo'></img></Link>
          <div className="navbar_search_section">
            <input
              id="navbar_logged_in_search"
              className='navbar_searchbar'
              type='text'
              placeholder='Search for any textbook'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}>
            </input>
            <Link to="/search"><button className='navbar_search_button'>Search</button></Link>
            <img src={locationIcon} alt='Location Icon'></img>
            <p id='navbar_location_text'>Calgary, AB</p>
          </div>
          <div className="navbar_acc_section">
            <div>
              <button className='book_check'></button>
              <button className='chat'></button>
              <button className='notif'></button>
              <div className="profile-dropdown-container" ref={dropdownRef}>
                <button className='profile' onClick={() => setShowDropdown(!showDropdown)}></button>
                {showDropdown && (
                  <div className="profile-dropdown">
                    <Link to="/myads" onClick={handleLinkClick}>My Ads</Link>
                    <Link to="/myfavorites" onClick={handleLinkClick}>My Favorites</Link>
                    {admin && <Link to="/admin" onClick={handleLinkClick}>Administrator</Link>}
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                )}
              </div>
              <Link to="/create"><button className='navbar_login_button'>Post Ad</button></Link>
            </div>
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
  )
}

export default Navbar;