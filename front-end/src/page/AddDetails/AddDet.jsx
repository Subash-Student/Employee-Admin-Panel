import React, { useState } from 'react'
import "./add.css"

const AddDet = () => {

    const[image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        email:"",
        mobile:"",
        designation:"",
        gender:"",
        degree:"",
        byAdd:localStorage.getItem("name")
    })

    const onChangeHandler = (e)=>{
          const name = e.target.name;
          const value = e.target.value;
    setData(data=>({...data,[name]:value}))
    }

  return (
    <div className='body'>

<div className="form-container">
    <h2>Registration Form</h2>
    
    <form>
       
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
                <option value="developer">Developer</option>
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