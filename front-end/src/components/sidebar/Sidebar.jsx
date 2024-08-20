import React from 'react';
import { NavLink } from 'react-router-dom';
import "./sidebar.css"
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
             <NavLink to="/add" className="sidebar-option">
                <p>Add</p>
             </NavLink>

             <NavLink to="/show" className="sidebar-option">
                <p>Show Details</p>
            </NavLink>

            <NavLink to="/update" className="sidebar-option">
                <p>Update</p>
            </NavLink>
            
        </div>
    </div>
  )
}

export default Sidebar