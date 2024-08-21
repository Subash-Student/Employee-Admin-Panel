import React, { useContext, useState } from 'react'
import "./add.css"
import axios from "axios";
import {toast} from "react-toastify"
import {StoreContext} from "../../context/StoreContext"

const AddDet = () => {

    const {url} = useContext(StoreContext);

    const[image,setImage] = useState();
    const [data,setData] = useState({
        name:"",
        email:"",
        mobile:"",
        designation:"developer",
        gender:"",
        degree:"",
        byAdd:localStorage.getItem("name")
    })
console.log(data);
    const onChangeHandler = (e)=>{
          const name = e.target.name;
          const value = e.target.value;
    setData(data=>({...data,[name]:value}))
    }
console.log(image);


const onSubmit = async(e)=>{
   
    e.preventDefault();

    const formData = new FormData();

    formData.append("name",data.name);
    formData.append("email",data.email);
    formData.append("mobile",data.mobile);
    formData.append("designation",data.designation);
    formData.append("gender",data.gender);
    formData.append("degree",data.degree);
    formData.append("image",image);
    formData.append("byAdd",data.byAdd);

    try {
        const response = await axios.post(`${url}/api/employee/add`,formData);
        if(response.data.success){
            setData({
                name:"",
                email:"",
                mobile:"",
                designation:data.designation,
                gender:"",
                degree:"",
                byAdd:localStorage.getItem("name")
            })
            setImage();
            toast.success(response.data.message);
        }else{
            toast.info(response.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed");
    }
    
}





  return (
    <div className='body'>

<div className="form-container">
    <h2>Registration Form</h2>
    
    <form onSubmit={onSubmit}>
       
        <div className="form-group">
            <label >Name:</label>
            <input type="text" id="name" onChange={onChangeHandler} value={data.name} name="name" required placeholder='Employee Name'/>
        </div>


        <div className="form-group">
            <label >Email:</label>
            <input type="email"onChange={onChangeHandler} id="email"value={data.email} name="email" placeholder='Employee Email' required/>
        </div>

        
        <div className="form-group">
            <label >Mobile Number:</label>
            <input type="tel"onChange={onChangeHandler} id="mobile"value={data.mobile} name="mobile" placeholder='Employee Mobile No' required/>
        </div>

        <div className="form-group">
            <label >Designation:</label>
            <select id="designation" name="designation"onChange={onChangeHandler} required>
                <option  value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="tester">Tester</option>
                <option value="manager">Manager</option>
            </select>
        </div>

        
        <div className="form-group-inline">
            <label>Gender:</label>
            <label><input type="radio"onChange={onChangeHandler} name="gender" value="male" required/> Male</label>
            <label><input type="radio"onChange={onChangeHandler} name="gender" value="female" required/> Female</label>
            <label><input type="radio"onChange={onChangeHandler} name="gender" value="other" required/> Other</label>
        </div>

      
        <div className="form-group">
            <label>Degree:</label>
            <label><input type="checkbox"onChange={onChangeHandler} name="degree" value="bachelor"/> Bachelor's</label>
            <label><input type="checkbox"onChange={onChangeHandler} name="degree" value="master"/> Master's</label>
            <label><input type="checkbox"onChange={onChangeHandler} name="degree" value="phd"/> PhD</label>
        </div>

        
        <div className="form-group">
            <label >Upload Image:</label>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} id="image" name="image" accept="image/*" required />
        </div>

        <div className="form-group">
            <button type="submit" className="submit-btn">Submit</button>
        </div>
    </form>
</div>

</div>
  )
}

export default AddDet