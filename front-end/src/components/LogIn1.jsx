import React, { useContext, useState } from 'react'
import "../components/login.css"
import axios from "axios";
import {toast} from "react-toastify"
import { StoreContext } from '../context/StoreContext';

const LogIn1 = () => {
    const {url,setToken} = useContext(StoreContext);
    const[isVisible,setIsVisible] = useState(false);
    const [data,setData] =useState({
        name:"",
        email:"",
        password:""
    });
    const onLogIn =async(e)=>{
        e.preventDefault();
        let newUrl = url;
        if(!isVisible){
            newUrl+="/api/user/login"
        }else{
            newUrl+="/api/user/register";
        }
    console.log(newUrl);
        try {
            const response = await axios.post(newUrl,data);
            if(response.data.success){
                toast.success(response.data.message);
                setToken(response.data.token);  
                localStorage.setItem("token",response.data.token);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed");
        }

    }
    const onChangeHandler =(e)=>{
         const name = e.target.name;
         const value = e.target.value;
         setData((data)=>({...data,[name]:value}));
        }
        console.log(data);
  return (
    <div className='container'>
        {isVisible ? <h1>Register</h1> :<h1>LogIn</h1>
        }
        
        <hr />
            <form className='form' onSubmit={onLogIn}>
                <label >
                {isVisible &&
                 <>
                 <h4>User Name</h4>
                 <input type="text" required name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter Your User Name'/>
                 </>
                 }
                <h4>Email</h4>
                 <input type="email" required name="email" onChange={onChangeHandler} value={data.email} placeholder='Enter Your Email'/>
                 <h4>PassWord</h4>
                 <input type="password" required name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Your Password'/>
                </label>
                <br />
                <button className='btn' type='submit'>LogIn</button>
                {!isVisible ?
                   <p>new ? <a onClick={()=>setIsVisible(prev =>!prev)} className='link'> Create Account</a></p> : <p >Already have an account ? <a onClick={()=>setIsVisible(prev =>!prev)} className='link'>LogIn</a></p>
                }
            </form>
    </div>
  )
}

export default LogIn1