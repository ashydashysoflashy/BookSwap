import './AdminSidebar.css'
import logo from '../../assets/logo_large.png';
const AdminSidebar = () => {
  return (
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
  )
}

export default AdminSidebar;