import React, { createContext,useState } from 'react'


export const StoreContext = createContext();

const StoreContextProvider = (props) => {
       
    const url ="http://localhost:3000";
    const[user,setUser]=useState({});
    const[token,setToken] = useState(localStorage.getItem("token"));
           

    const contextValue = {
        token,
        setToken,
        url,
        user,
        setUser
    }



  return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;