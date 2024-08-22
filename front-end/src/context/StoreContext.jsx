import React, { createContext,useEffect,useState } from 'react'
import axios from"axios";
import {toast} from "react-toastify";


export const StoreContext = createContext();

const StoreContextProvider = (props) => {
       
    const url ="http://localhost:3000";
    const[token,setToken] = useState(localStorage.getItem("token"));
   
    const[data,setData] = useState({});
    async function fetchData(){
      try {
        const response = await axios.get(`${url}/api/employee/show`);
        if(response.data.success){
          setData(response.data.data);
        }else{
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed");
      }
    }
   useEffect(()=>{
    fetchData();
   },[])
 

   const contextValue = {
    token,
    setToken,
    url,
    data
}


  return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;