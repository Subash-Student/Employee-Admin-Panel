import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from "../../context/StoreContext"
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import CheckIcon from '@rsuite/icons/Check';
import SearchIcon from '@rsuite/icons/Search';
import "./up.css"


const UpdateDet = () => {

  const{employeeDetails,employeeData,url} = useContext(StoreContext);
  const [searchQuery,setSearchQuery] = useState("");
  const[editableRow,setEditableRow] = useState(null);
  const [newData,setNewData] = useState(employeeDetails);
  const[newImg,setNewImg] = useState();



  useEffect(()=>{
    employeeData(searchQuery);
  },[searchQuery])

  const handleChange = (e,id)=>{
   let name = e.target.name;
   let value = e.target.value;
   setNewData(
    newData.map(emp=>emp._id===id ?{...emp,[name]:value} : emp)
   );
  }

  console.log(newData);

  const handleFileChange = (e,id)=>{
    let file = e.target.files[0];
    setNewImg(file);
  }
  console.log(newImg);

  const onSave = ()=>{
    setEditableRow(null);
  }

  const handleEdit = (id)=>{
    setEditableRow(id);
  }


  return (
<div className="main-container">
    <div className="container">
        <h2>User Details</h2>
        <input type="text" placeholder='Search By Name or Email' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
        <SearchIcon className='search'/>
        <table>
          <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>IT Designation</th>
                <th>Gender</th>
                <th>Degree</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {newData.length>0 && newData.map((employee) => (
            <tr key={employee._id}>
              <td>
                <img src={`${url}/images/${employee.image}`} alt={employee.name} />
                {editableRow === employee._id && (
                  <input
                  name='image'
                    type="file"
                    onChange={(e) => handleFileChange(e, employee.id)}
                  />
                )}
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  disabled={editableRow !== employee._id}
                  onChange={(e) => handleChange(e, employee._id)}
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  disabled={editableRow !== employee._id}
                  onChange={(e) => handleChange(e, employee._id)}
                />
              </td>
              <td>
                <input
                  type="tel"
                  name="mobile"
                  value={employee.mobile}
                  disabled={editableRow !== employee._id}
                  onChange={(e) => handleChange(e, employee._id)}
                />
              </td>
              <td>
                <select
                  name="designation"
                  value={employee.designation}
                  disabled={editableRow !== employee._id}
                  onChange={(e) => handleChange(e, employee._id)}
                >
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
                  <option value="designer">Designer</option>
                  <option value="tester">Tester</option>
                </select>
              </td>
              <td>
                <select
                  name="gender"
                  value={employee.gender}
                  disabled={editableRow !== employee._id}
                  onChange={(e) => handleChange(e, employee._id)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </td>
              <td>
                <select
                  name="degree"
                  value={employee.degree}
                  disabled={editableRow !== employee._id}
                  onChange={(e) => handleChange(e, employee._id)}
                >
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </td>
              <td>
                <div className="action-buttons">
                  {editableRow === employee._id ? (
                    <button className="save-btn" onClick={onSave}>
                      Save
                    </button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(employee._id)}>
                      Edit
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
</div>
  )
}

export default UpdateDet