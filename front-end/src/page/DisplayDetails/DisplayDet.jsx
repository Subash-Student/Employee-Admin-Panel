import React from 'react'
import "./display.css"



const DisplayDet = () => {
  return (
    <div className='body'>

    <div class="container">
        <h2>Employee Details</h2>
        <table>
           
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>IT Designation</th>
                <th>Gender</th>
                <th>Degree</th>
            </tr>
            
            <tr>
                <td><img src={""} alt="Uploaded Image"/></td>
                <td>John Doe</td>
                <td>johndoe@example.com</td>
                <td>+1234567890</td>
                <td>Developer</td>
                <td>Male</td>
                <td>Bachelor's</td>
            </tr>
        </table>
    </div>
    </div>
  )
}

export default DisplayDet


