import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ setAuthenticated }) => {   // ✅ RECEIVE PROP
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 4 || formData.password.length > 12) {
            alert('Password must be between 4 and 12 characters.');
            return;
        }

        try {
            const res = await axios.post(
                'http://localhost:5000/api/users/login',
                {
                    email: formData.email,
                    password: formData.password
                },
                { withCredentials: true }
            );

            console.log('Login response:', res.data);

            setAuthenticated(true);   // ✅ IMPORTANT FIX
            navigate('/dashboard');   // ✅ Redirect
        } catch (error) {
            console.error('Login error:', error);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login to Your Account</h2>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
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

                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
