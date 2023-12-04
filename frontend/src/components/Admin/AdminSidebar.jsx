import './AdminSidebar.css'
import logo from '../../assets/logo_large.png';
import { useState } from 'react';
const AdminSidebar = () => {

  const [menuState, setMenuState] = useState(false);

  const showMenu = (e) => {
    const menu = document.getElementById('admin_sidebar_menu');
    if (!menuState) {
      setMenuState(true);
      menu.style.right = "100%";
      e.target.innerHTML = '\u2bc8';
    } else {
      setMenuState(false);
      menu.style.right = "0%";
      e.target.innerHTML = '\u2bc7';
    }
  }

  return (
    <>
      <button className='admin_right_button' onClick={showMenu}>&#11208;</button>
      <div className="sidebar_container">
        <div className='sidebar_top_content'>
          <img alt='BookSwap logo' src={logo} />
          <h1 className='sidebar_top_title'>Admin Dashboard</h1>
          <div className='sidebar_line'></div>
          <div className='sidebar_button_container'>
            <button className='sidebar_button'>Reported Listings</button>
            <button className='sidebar_button'>Deleted Listings</button>
            <button className='sidebar_button'>Banned Users</button>
          </div>
        </div>
        <div className='sidebar_bottom_content'>
          <button className='sidebar_button'>Back to Site</button>
          <button className='sidebar_button'>Log Out</button>
        </div>
      </div>
      <div className="sidebar_container" id='admin_sidebar_menu'>
        <div className='sidebar_top_content'>
          <img alt='BookSwap logo' src={logo} />
          <h1 className='sidebar_top_title'>Admin Dashboard</h1>
          <div className='sidebar_line'></div>
          <div className='sidebar_button_container'>
            <button className='sidebar_button'>Reported Listings</button>
            <button className='sidebar_button'>Deleted Listings</button>
            <button className='sidebar_button'>Banned Users</button>
          </div>
        </div>
        <div className='sidebar_bottom_content'>
          <button className='sidebar_button'>Back to Site</button>
          <button className='sidebar_button'>Log Out</button>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar;