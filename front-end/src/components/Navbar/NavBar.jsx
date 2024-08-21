import React, { useContext } from 'react'
import {toast} from "react-toastify"
import {Link,useNavigate} from "react-router-dom";
import AdminIcon from '@rsuite/icons/Admin';
import "./navbar.css"
import { StoreContext } from '../../context/StoreContext';


const NavBar = () => {
  const{user,setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  const onLogOut = ()=>{
    
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.info("You are loged out");

  }
  return (
    <div className='nav'>
        <div className="navItems">
            <div className="per">
            <AdminIcon className='icon' />
            <h2>{localStorage.getItem("name")}</h2>
          </div>
            <h2 className='h'>Employee Details Management</h2>
        <button onClick={()=>{onLogOut()}}>Log Out</button>
        </div>
    </div>
  )
}

export default NavBar