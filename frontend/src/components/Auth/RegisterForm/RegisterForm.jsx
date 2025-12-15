import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 4 || formData.password.length > 12) {
            alert('Password must be 4 to 12 characters long.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post(
                'http://localhost:5000/api/users/register',
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                },
                {
                    withCredentials: true, // ✅ Required to receive cookies
                }
            );

            alert('Registered successfully!');
            console.log('Server response:', res.data);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };


    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>

                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="••••••••"
                            value={formData.password}
                            minLength={4}
                            maxLength={12}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        minLength={4}
                        maxLength={12}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Register</button>
                <p className="login-link">Already have an account? <a href="/auth/login">Login</a></p>
            </form>
        </div>
    );
};

export default RegisterForm;
