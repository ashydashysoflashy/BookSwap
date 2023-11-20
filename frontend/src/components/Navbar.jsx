import { Link } from 'react-router-dom'

import logo from '../assets/logo_large.png'
import locationIcon from '../assets/location_icon.png'

import './Navbar.css'

const Navbar = () => {

  return (
    <header>
      <div className="navbar_container">
        <div className="navbar_top">
          <Link to="/"><img className='navbar_logo' src={logo} alt='Logo'></img></Link>
          <div className="navbar_search_section">
            <input className='navbar_searchbar' type='text' placeholder='Search for any textbook'></input>
            <Link to="/Browse"><button className='navbar_search_button'>Search</button></Link>
            <img src={locationIcon} alt='Location Icon'></img>
            <p id='navbar_location_text'>Calgary, AB</p>
          </div>
          <div className="navbar_acc_section">
            <Link to="/register">Create an Account</Link>
            <Link to="/login"><button className='navbar_login_button'>Log In</button></Link>
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