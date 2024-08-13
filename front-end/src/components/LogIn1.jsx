import React, { useState } from 'react'
import "../components/login.css"

const LogIn1 = () => {
    const[isVisible,setIsVisible] = useState(false);
    const [data,setData] =useState({
        name:"",
        email:"",
        password:""
    });
    const registerHandler = ()=>{
        
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
            <form className='form'>
                <label >
                 <h4>User Name</h4>
                 <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter Your User Name'/>
                 {isVisible &&
                 <>
                 <h4>Email</h4>
                 <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Enter Your Email'/>
                 </>
                 }
                 <h4>PassWord</h4>
                 <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Your Password'/>
                </label>
                <br />
                <button className='btn'>LogIn</button>
                {!isVisible ?
                   <p>new ? <a onClick={()=>setIsVisible(prev =>!prev)}> Create Account</a></p> : <p>Already have an account ? <a onClick={()=>setIsVisible(prev =>!prev)}>LogIn</a></p>
                }
            </form>
    </div>
  )
}

export default LogIn1