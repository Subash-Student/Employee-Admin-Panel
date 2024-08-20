import React from 'react'
import AdminIcon from '@rsuite/icons/Admin';
import "./navbar.css"


const NavBar = () => {
  return (
    <div className='nav'>
        <div className="navItems">
            <div className="per">
            <AdminIcon className='icon' />
            <h2>Subash</h2>
          </div>
            <h2 className='h'>Employee Details Management</h2>
        <button>Log Out</button>
        </div>
    </div>
  )
}

export default NavBar