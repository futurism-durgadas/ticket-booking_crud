import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import RegisterService from "../Service/RegisterService";

function Register() {
  const navigate = useNavigate();

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email_id, setEmail_id] = useState('')
  const [address, setAddress] = useState('')
  const [age, setAge] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('')

  //for validation to the fields
  const [errors, setErrors] = useState({
    fNameError : '',
    lNameError : '',
    email_idError : '',
    addressError : '',
    ageError : '',
    contactError : '',
    genderError : ''
  })

  const validateForm = (data) => {
    let errors = {};

    if (!data.fname) {
      errors.fname = 'First name is required';
    }

    if (!data.lname) {
      errors.lname = 'last name is required';
    }

    if (!data.email_id) {
      errors.email_id = 'email is required';
    }
    if (!data.address) {
      errors.address = 'address is required';
    }

    if (!data.age) {
      errors.age = 'age is required';
    }

    if (!data.contact) {
      errors.contact = 'contact is required';
    }

    if (!data.gender) {
      errors.gender = 'gender is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { fname, lname, email_id, address, age, contact ,gender}
    const validationErrors = validateForm(user);

    if (Object.keys(validationErrors).length === 0){
      RegisterService.addUser(user).then((response) => {
      console.log(response.data)
      // alert("Form Submited")
      navigate("/tickets")
    }).catch(error => {
      console.log(error)
    })
    }else{
      // alert("Please fill all the fields")
      setErrors(validationErrors);
    }
  }

  const handleKeyDown = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fname':
      case 'lname':
        if (!/^[a-zA-Z ]*$/.test(e.key)) { 
          e.preventDefault();
        }
        break;
      case 'email_id':
        if (e.key === ' ') {
          e.preventDefault();
        }
        break;
      case 'address':
        if (value.length >= 50 && e.key !== 'Backspace') {
          e.preventDefault();
        }
        break;
      case 'age':
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace' || value.length >=2) {
          e.preventDefault();
        }
        break;
      case 'contact':
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
          e.preventDefault();
        }
        break;

      default:
        break;
    }
  };
  

  return (
    <div>
      <div className="Container mt-2 mb-4">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Register User</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <div className="row">
                  <div class="col-sm">
                    <label className="form-label">First Name :</label>
                    <input type="text" name="fname" className="form-control"
                      value={fname} onKeyDown={handleKeyDown} 
                      onChange={(e) => setFname(e.target.value)} >
                    </input>
                    {errors.fname && <span className="error" style={{ color: "red" }}>{errors.fname}</span>}
                  </div>

                  <div class="col-sm">
                    <label className="form-label">Last Name :</label>
                    <input type="text" name="lname" className="form-control"
                      value={lname} onKeyDown={handleKeyDown}
                      onChange={(e) => setLname(e.target.value)}>
                    </input>
                    {errors.lname && <span className="error" style={{ color: "red" }}>{errors.lname}</span>}
                  </div>
                </div>
                <div className="row mt-2">
                  <div class="col-sm">
                    <label className="form-label">Email Id :</label>
                    <input type="text" name="email_id" className="form-control"
                      value={email_id} onKeyDown={handleKeyDown}
                      onChange={(e) =>setEmail_id(e.target.value)}>
                    </input>
                    {errors.email_id && <span className="error" style={{ color: "red" }}>{errors.email_id}</span>}
                  </div>

                  <div class="col-sm">
                    <label className="form-label">Address :</label>
                    <input type="text" name="address" className="form-control"
                      value={address} onKeyDown={handleKeyDown} 
                      onChange={(e) =>setAddress(e.target.value)}>
                    </input>
                    {errors.address && <span className="error" style={{ color: "red" }}>{errors.address}</span>}
                  </div>
                </div>

                <div className="row mt-2">
                  <div class="col-sm">
                    <label className="form-label">Age :</label>
                    <input type="number" name="age" min="0" max="100" className="form-control"
                      maxlength="2" value={age} onKeyDown={handleKeyDown}
                      onChange={(e) =>setAge(e.target.value)}>
                    </input>
                    {errors.age && <span className="error" style={{ color: "red" }}>{errors.age}</span>}
                  </div>

                  <div class="col-sm">
                    <label className="form-label">Contact :</label>
                    <input type="text" name="contact" maxlength="10" className="form-control" id="contact"
                      value={contact} onKeyDown={handleKeyDown}
                      onChange={(e) => setContact(e.target.value)}>
                    </input>
                    {errors.contact && <span className="error" style={{ color: "red" }}>{errors.contact}</span>}
                  </div>
                </div>

                <div className="row mt-2">
                  <div class="col-sm">
                    <label className="form-label">Gender : </label>
                    <label>
                      <input type="radio" name="gender" value="Male" checked={gender === "Male"}
                        onChange={(e) => setGender(e.target.value)} />
                      Male
                    </label>
                    &nbsp;&nbsp;&nbsp;
                    <label>
                      <input type="radio" name="gender" value="Female" checked={gender === "Female"}
                        onChange={(e) => setGender(e.target.value)} />
                      Female
                    </label>
                    <br></br>
                    {errors.gender && <span className="error" style={{ color: "red" }}>{errors.gender}</span>}
                  </div>
                  <div class="col-sm">
                    
                  </div>
                </div>

                <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>Submit</button>
                <Link to="/getUser" className="btn btn-danger">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;