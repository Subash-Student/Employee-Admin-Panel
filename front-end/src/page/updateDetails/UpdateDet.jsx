import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import './up.css';

const UpdateDet = () => {
  const { employeeDetails, employeeData, url } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [editableRow, setEditableRow] = useState(null);
  const [newData, setNewData] = useState(employeeDetails);
  const [images, setImages] = useState([]);

  useEffect(() => {
    employeeData(searchQuery);
  }, [searchQuery]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setNewData((prevData) =>
      prevData.map((emp) => (emp._id === id ? { ...emp, [name]: value } : emp))
    );
  };

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prevImages) => {
        const existingImageIndex = prevImages.findIndex((img) => img.id === id);
        if (existingImageIndex > -1) {
          const updatedImages = [...prevImages];
          updatedImages[existingImageIndex].image = file;
          return updatedImages;
        } else {
          return [...prevImages, { id, image: file }];
        }
      });
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    let isSuccessful = true;
    let message = "Details updated successfully";
  
    for (const emp of newData) {
      const formData = new FormData();
      formData.append('_id', emp._id);
      formData.append('name', emp.name);
      formData.append('email', emp.email);
      formData.append('mobile', emp.mobile);
      formData.append('designation', emp.designation);
      formData.append('gender', emp.gender);
      formData.append('degree', emp.degree);
  
      const image = images.find((img) => img.id === emp._id);
      if (image) {
        formData.append('image', image.image);
      }
  
      try {
        const response = await axios.put(`${url}/api/employee/update`, formData);
        if (!response.data.success) {
          isSuccessful = false;
          message = response.data.message;
          break; 
        }
      } catch (error) {
        console.log(error);
        isSuccessful = false;
        message = "Failed to update details";
        break; 
      }
    }
  
    if (isSuccessful) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  
    setEditableRow(null);
  };

  const handleCancel = () => {
    setEditableRow(null);
    setNewData(employeeDetails);
    setImages([]);
  };

  const handleEdit = (id) => {
    setEditableRow(id);
  };
  
  const handleDelete = async(e,id)=>{

    e.preventDefault();
    const ids = {
      _id:id,
    }
console.log(id);
    try {
      const response = await axios.post(`${url}/api/employee/delete`,ids);
      if(response.data.success){
        toast.success(response.data.message);
         setEditableRow(null);

      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed Delete Operation");
    }
  }

  return (
    <div className="main-container">
      <div className="container">
        <h2>Update Employee Details</h2>
        <div className="inputtag">
          <input
            type="text"
            className="input"
            placeholder="Search By Name or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
            {newData.length > 0 &&
              newData.map((employee) => (
                <tr key={employee._id}>
                  <td>
                    {editableRow === employee._id ? (
                      <input
                        name="image"
                        type="file"
                        onChange={(e) => handleFileChange(e, employee._id)}
                      />
                    ) : (
                      <img src={`${url}/images/${employee.image}`} alt={employee.name} />
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
                        <div className="btns">
                          <button className="save-btn" onClick={onSave}>
                            Save
                          </button>
                          <button className="close-btn" onClick={handleCancel}>
                            Cancel
                          </button>
                          <button className="delete-btn" onClick={(e)=>handleDelete(e,employee._id)}>
                            Delete
                          </button>
                        </div>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(employee._id)}
                        >
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
  );
};

export default UpdateDet;
