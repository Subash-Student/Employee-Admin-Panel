import React, { useContext, useState } from 'react'
import "./login.css"
import axios from "axios";
import {toast} from "react-toastify"
import { StoreContext } from '../../context/StoreContext';

const LogIn1 = () => {
    const {url,setToken} = useContext(StoreContext);
    const[isVisible,setIsVisible] = useState(false);
    const [data,setData] =useState({
        name:"",
        email:"",
        password:"",
        code:""
    });
    const onLogIn =async(e)=>{
        e.preventDefault();
        let newUrl = url;
        if(!isVisible){
            newUrl+="/api/user/login"
        }else{
            newUrl+="/api/user/register";
        }
        try {
            const response = await axios.post(newUrl,data);
            if(response.data.success){
                toast.success(response.data.message);
                setToken(response.data.token);  
                localStorage.setItem("name",response.data.user.name);
                localStorage.setItem("token",response.data.token);
            }else{
                toast.info(response.data.message);
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
  return (
    <div className="con">
    <div className='container1'>
        {isVisible ? <h1>Register</h1> :<h1>LogIn</h1>
        }
        
        <hr />
            <form className='form' onSubmit={onLogIn}>
                <label >
                {isVisible &&
                 <>
                 <h4>User Name</h4>
                 <input className='fIn' type="text" required name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter Your User Name'/>
                 </>
                 }
                <h4>Email</h4>
                 <input className='fIn' type="email" required name="email" onChange={onChangeHandler} value={data.email} placeholder='Enter Your Email'/>
                 <h4>PassWord</h4>
                 <input className='fIn' type="password" required name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Your Password'/>
                {isVisible &&
                <>
                 <h4>Admin Code</h4>
                 <input className='fIn' type="text" required name='code' onChange={onChangeHandler} value={data.code} placeholder='code : 2020' />
                </>
                }
    
                </label>
                <br />
                <div className="b">
                <button className='btn' type='submit'>{isVisible?"Register":"LogIn"}</button>
                {!isVisible ?
                   <p>new ? <a onClick={()=>setIsVisible(prev =>!prev)} className='link'> Create Account</a></p> : <p >Already have an account ? <a onClick={()=>setIsVisible(prev =>!prev)} className='link'>LogIn</a></p>
                }
                </div>
               
            </form>
    </div>
    </div>
  )
}

export default LogIn1