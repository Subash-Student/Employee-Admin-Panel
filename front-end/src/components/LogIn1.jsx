import React, { useState } from 'react'
import "../components/login.css"

const LogIn1 = () => {
    const [data,setData] =useState({
        name:"",
        password:""
    });

    const onChangeHandler =(e)=>{
         const name = e.target.name;
         const value = e.target.value;
         setData((data)=>({...data,[name]:value}));
        }
        console.log(data);
  return (
    <div className='container'>
        <h1>LogIn</h1>
        <hr />
            <form className='form'>
                <label >
                 <h4>User Name</h4>
                 <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter Your User Name'/>
                 <h4>PassWord</h4>
                 <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Your Password'/>
                </label>
                <br />
                <button className='btn'>LogIn</button>
            </form>
    </div>
  )
}

export default LogIn1