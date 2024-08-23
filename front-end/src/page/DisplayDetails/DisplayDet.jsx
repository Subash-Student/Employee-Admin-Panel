import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from "../../context/StoreContext"
import SearchIcon from '@rsuite/icons/Search';
import "./display.css"



const DisplayDet = () => {

  const{employeeDetails,employeeData,url} = useContext(StoreContext);
  const [searchQuery,setSearchQuery] = useState("");

  useEffect(()=>{
    employeeData(searchQuery);
  },[searchQuery])


  return (
    <div className="main-container">
    <div className="container">
        <h2>Employee Details</h2>
        <input type="text" placeholder='Search By Name or Email' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
        <SearchIcon className='search'/>
        <table>
    <tbody>
    <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>IT Designation</th>
                <th>Gender</th>
                <th>Degree</th>
                <th>Added By</th>
            </tr>
           {employeeDetails.length>0 && employeeDetails.map((emp)=>(
               <tr key={emp._id}>
                <td><img src={`${url}/images/${emp.image}`} alt="Uploaded Image"/></td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                <td>{emp.degree}</td>
                <td>{emp.AddedBy}</td>
            </tr>
            )
           )

           }
           
    </tbody>
    
        </table>
    </div>
</div>
  )
}

export default DisplayDet


