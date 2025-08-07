import React, { useState } from 'react';
import axios from 'axios';
import './ExpenseForm.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = () => {
    const [expense, setExpense] = useState({
        title: '',
        amount: '',
        type: '',
        category: '',
        date: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: expense.title,
            amount: Number(expense.amount),
            type: expense.type, // ✅ from user selection
            category: expense.category || 'Other',
            date: expense.date || new Date().toISOString().split('T')[0],
            description: expense.description || '',
        };

        try {
            const response = await axios.post(
                'http://localhost:5000/api/transactions',
                payload,
                { withCredentials: true }
            );

            toast.success(response.data.message || 'Transaction added!');

            // Reset form after submission
            setExpense({
                title: '',
                amount: '',
                type: '',
                category: '',
                date: '',
                description: '',
            });
        } catch (error) {
            console.error('Error submitting transaction:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="form-container animate-fade">
            <form onSubmit={handleSubmit} className="expense-form">
                <h2>Add New Transaction</h2>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={expense.title}
                        onChange={(e) => setExpense({ ...expense, title: e.target.value })}
                        required
                        placeholder="Groceries, Salary, etc."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={expense.amount}
                        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                    />
                </div>

                {/* ✅ New Dropdown for Type */}
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        value={expense.type}
                        onChange={(e) => setExpense({ ...expense, type: e.target.value })}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={expense.category}
                        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Housing">Housing</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={expense.date}
                        onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description (Optional)</label>
                    <textarea
                        id="description"
                        value={expense.description}
                        onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                        placeholder="Add notes or details"
                    />
                </div>

                <button type="submit" className="submit-btn">Add Transaction</button>
            </form>

            {/* Toast Notification */}
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default ExpenseForm;
