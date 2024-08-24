import React, { createContext,useEffect,useState } from 'react'
import axios from"axios";
import {toast} from "react-toastify";


export const StoreContext = createContext();

const StoreContextProvider = (props) => {
       
    const url ="http://localhost:3000";
    const[employeeDetails,setEmployeeDetails] = useState([]);

    const[token,setToken] = useState(localStorage.getItem("token"));
   
    const[data,setData] = useState([]);
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

    function employeeData(searchQuery){
        if(searchQuery === ""){
          setEmployeeDetails(data);
        }else{
          const filtered = data.filter(employee =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            employee.email.toLowerCase().includes(searchQuery.toLowerCase())   
          );
          setEmployeeDetails(filtered);
        }
    }



    useEffect(() => {
      const handleLoad = () => {
        fetchData();
      };
    
      window.addEventListener("load", handleLoad);
    
      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }, []);
 

   const contextValue = {
    token,
    setToken,
    url,
    data,
    employeeDetails,
    employeeData
}


  return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;