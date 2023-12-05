import './AdminSidebar.css'
import logo from '../../assets/logo_large.png';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import {useLogout} from "../../hooks/useLogout";

const AdminSidebar = ({ admin }) => {

  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();

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

  const handleLogout =  async () => {
    await logout();
    window.location.reload(); // This will reload the page
    navigate('/');
  };

  return (
    <>
      <button className='admin_right_button' onClick={showMenu}>&#11208;</button>
      <div className="sidebar_container">
        <div className='sidebar_top_content'>
          <img alt='BookSwap logo' src={logo} />
          <h1 className='sidebar_top_title'>Admin Dashboard</h1>
          <div className='sidebar_line'></div>
        </div>
        <div className='sidebar_bottom_content'>
          <button className='sidebar_button' onClick={()=>navigate('/home')}>Back to Site</button>
          <button className='sidebar_button' onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      <div className="sidebar_container" id='admin_sidebar_menu'>
        <div className='sidebar_top_content'>
          <img alt='BookSwap logo' src={logo} />
          <h1 className='sidebar_top_title'>Admin Dashboard</h1>
          <div className='sidebar_line'></div>
        </div>
        <div className='sidebar_bottom_content'>
          <button className='sidebar_button' onClick={()=>navigate('/home')}>Back to Site</button>
          <button className='sidebar_button' onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar;