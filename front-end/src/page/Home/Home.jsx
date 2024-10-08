import React, { useContext } from 'react'
import {Routes,Route} from "react-router-dom"
import LogIn1 from '../../components/LogIn/LogIn1';
import { StoreContext } from '../../context/StoreContext';
import Sidebar from '../../components/sidebar/Sidebar';
import AddDet from '../AddDetails/AddDet';
import DisplayDet from '../DisplayDetails/DisplayDet';
import NavBar from '../../components/Navbar/NavBar';
import UpdateDet from '../updateDetails/UpdateDet';



const Home = () => {

  const {token} = useContext(StoreContext);
  return (
    <div>
      {!!token ?
      <>
        <NavBar />
        <div className="app-content">
        <Sidebar />
        <Routes>
         <Route path='/add' element={<AddDet />}/>
         <Route path='/show' element={<DisplayDet />}/>
         <Route path='/update' element={<UpdateDet />}/>
         <Route path='/' element={<h1 className='welcome'>Welcome {localStorage.getItem("name")}....!</h1> } />
      </Routes> 
        
        </div>
      </>:
     <LogIn1 />
      }

      
    </div>
  )
}

export default Home;