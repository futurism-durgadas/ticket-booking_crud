import React, { useEffect, useState } from 'react'
import RegisterService from '../Service/RegisterService'

function GetUser() { 
    const [users ,setUsers]=useState([])

    useEffect(() =>{
        RegisterService.getAllUsers().then((response) => {
            setUsers(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }, [])

  return (
    <div className="Container">
        <h2 className="text-center"> List of Users</h2>
        <table className="table table-bordered table-striped">
            <thead>
                {/* <th>User Id</th> */}
                <th>First Name</th>
                <th>Last Name</th>
                <th>EmailId</th>
                <th>Address</th>
                <th>Age</th>
                <th>Contact No</th>
                <th>Gender</th>
            </thead>
            <tbody>
                {
                  users.map(
                    user =>           //user is alias map function
                    <tr key={user.id}>

                        {/* <td>{user.id}</td> */}
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        <td>{user.email_id}</td>
                        <td>{user.address}</td>
                        <td>{user.age}</td>
                        <td>{user.contact}</td>
                        <td>{user.gender}</td>

                    </tr>
                  )  
                }
            </tbody>
        </table> 
    </div>
  )
}
export default GetUser;