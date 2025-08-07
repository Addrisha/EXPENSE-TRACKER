import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Charts from '../Charts/Charts';
import ExportCSV from '../ExportCSV/ExportCSV';

const Dashboard = () => {
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/transactions', {
                    withCredentials: true,
                });

                const fetchedTransactions = res.data.transactions || [];
                setTransactions(fetchedTransactions);

                console.log('Fetched transactions:', fetchedTransactions); // ✅ Debug

                const income = fetchedTransactions
                    .filter((t) => t.type?.toLowerCase() === 'income')
                    .reduce((acc, curr) => acc + Number(curr.amount), 0);

                const expense = fetchedTransactions
                    .filter((t) => t.type?.toLowerCase() === 'expense')
                    .reduce((acc, curr) => acc + Number(curr.amount), 0);

                setTotalIncome(income);
                setTotalExpense(expense);
            } catch (err) {
                console.error('Error loading dashboard data:', err);
                navigate('/auth/login'); // Redirect on error or invalid session
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth/login');
    };

    const balance = totalIncome - totalExpense;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Welcome Back, User 👋</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/expenseform">
                        <button className="add-expense-btn">+ Add Expense</button>
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="summary-cards">
                <div className="card income-card">
                    <h3>Total Income</h3>
                    <p>₹{totalIncome}</p>
                </div>
                <div className="card expense-card">
                    <h3>Total Expenses</h3>
                    <p>₹{totalExpense}</p>
                </div>
                <div className="card balance-card">
                    <h3>Balance</h3>
                    <p>₹{balance}</p>
                </div>
            </div>

            <Charts transactions={transactions} />
            <ExportCSV transactions={transactions} />
        </div>
    );
};

export default Dashboard;
