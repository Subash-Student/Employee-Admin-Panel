import React, { useContext } from 'react'
import LogIn1 from '../components/LogIn1';
import { StoreContext } from '../context/StoreContext';



const Home = () => {

  const {token,setToken} = useContext(StoreContext);

  return (
    <div>
      {!!token ?
   <h1>Wellcome To Admin Panel !</h1> : 
        <LogIn1 />
      }
      
    </div>
  )
}

export default Home;