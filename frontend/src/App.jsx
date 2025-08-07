import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import LoginForm from './components/Auth/LoginForm/LoginForm';
import RegisterForm from './components/Auth/RegisterForm/RegisterForm';
import Dashboard from './components/Dashboard/UserDashboard/Dashboard';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import Loader from './components/Layout/Loader/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication on first load (cookie-based session check)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          withCredentials: true
        });
        if (res.status === 200) {
          setAuthenticated(true);
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="app-wrapper">
        {authenticated && <Navbar />}

        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<LoginForm setAuthenticated={setAuthenticated} />} />
          <Route path="/auth/register" element={<RegisterForm />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={authenticated ? <Dashboard /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/expenseform"
            element={authenticated ? <ExpenseForm /> : <Navigate to="/auth/login" />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
