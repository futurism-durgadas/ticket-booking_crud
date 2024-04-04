import React, { useState } from 'react';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with form submission
            console.log('Form submitted successfully:', formData);
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/.test(data.password)) {
            errors.password = 'Password must contain at least one symbol';
        }

        return errors;
    };
    return (
        <div>
            <div className="Container mt-2 mb-4">
                <div className="card col-md-4 offset-md-4 offset-md-4">
                    <h2 className="text-center">Login</h2>
                    {/* <img src="D:\Futurism_DurgadasM\workspace\ReactJs Work\ticket-booking\src\Images\bus1.jpg"></img> */}
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label className="form-label">Email :</label>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                {errors.email && <span className="error" style={{ color: "red" }}>{errors.email}</span>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Password :</label>
                                <input type="password" className="form-control" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                {errors.password && <span className="error" style={{ color: "red" }}>{errors.password}</span>}
                            </div>

                            <button className="btn btn-success" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

