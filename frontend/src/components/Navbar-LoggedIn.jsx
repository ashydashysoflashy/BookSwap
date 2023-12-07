import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { CgProfile } from "react-icons/cg";
import logo from '../assets/logo_large.png'
import './Navbar.css'

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [admin, setAdmin] = useState()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [adminFetched, setAdminFetched] = useState(false)
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [userName,setUserName] = useState("")
  const [userFetched,setUserFetched] = useState(false)

  //fetch if a user is an admin to display the button to view the admin page
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/isAdmin/${user.id}`);
        const data = await response.json();
        //set admin to true if the response is ok and setfetched to true so it doesnt fetch again
        if (response.ok) {
          setAdmin(data);
          setAdminFetched(true)
          //error handling
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

    //fetch a users username
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Construct the query parameters
          const response = await fetch(`http://localhost:4000/api/user/${user.id}`);
          const data = await response.json();
          //set admin to true if the response is ok and setfetched to true so it doesnt fetch again
          if (response.ok) {
            setUserName(data);
            setUserFetched(true)
            console.log(userName)
          //error handling
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

  //function when a user clicks the logout button
  const handleLogout = async () => {
    await logout();
    window.location.reload(); // This will reload the page
    console.log('User logged out');
    navigate('/');
  };
  //function when a user enters something into the searchbar and searches
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

  //function if a user clicks any link, closes the dropdown
  const handleLinkClick = () => {
    setShowDropdown(false); // Close the dropdown when a link is clicked
  };

  //if a user clicks enter on the searchbar, then search
  function keyboardHandler(e) {
    const input = document.getElementById("navbar_logged_in_search")
    if (input.contains(e.target) && e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  //on page load add event listener for pressing keys (to see if enter key pressed)
  useEffect(() => {
    document.addEventListener('keydown', keyboardHandler)
    return () => { document.removeEventListener('keydown', keyboardHandler) }
  })

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
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
            <button className='navbar_search_button' onClick={handleSearchSubmit}>Search</button>
          </div>
          <div className="navbar_acc_section">
            <div className="right-side-container">
              <div className="username-div">
                <div className='username'>{userName === "" ? "" : userName}</div>
              </div>
              <div className="profile-dropdown-container" ref={dropdownRef}>
                <div id="profile-icon" ref={dropdownRef}>
                  <CgProfile fontSize={50} onClick={() => setShowDropdown(!showDropdown)} color="#8BA5FFFF" />
                </div>
                {showDropdown && (
                  <div className="profile-dropdown">
                    <Link to="/search" onClick={handleLinkClick}>View Listings</Link>
                    <Link to="/myads" onClick={handleLinkClick}>My Ads</Link>
                    <Link to="/change-password" onClick={handleLinkClick}>Change Password</Link>
                    <Link to="/myfavorites" onClick={handleLinkClick}>My Favorites</Link>
                    <Link id="test" to="/create" onClick={handleLinkClick}>Post Ad</Link>
                    {admin && <Link to="/admin" onClick={handleLinkClick}>Administrator</Link>}
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                )}
              </div>
              <Link to="/create"><button className='navbar_login_button'>Post Ad</button></Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;