import React, { useContext } from 'react'
import {Routes,Route} from "react-router-dom"
import LogIn1 from '../../components/LogIn/LogIn1';
import { StoreContext } from '../../context/StoreContext';
import Sidebar from '../../components/sidebar/Sidebar';
import AddDet from '../AddDetails/AddDet';
import DisplayDet from '../DisplayDetails/DisplayDet';
import NavBar from '../../components/Navbar/NavBar';



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
      </Routes> 
        </div>
      </>:
     <LogIn1 />
      }

      
    </div>
  )
}

export default Home;