import React, { useMemo } from 'react';
import './Charts.css';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell,
} from 'recharts';
import moment from 'moment';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#C71585', '#2E8B57'];

const Charts = ({ transactions }) => {
    // Group by Month
    const monthlyData = useMemo(() => {
        const data = {};

        transactions.forEach((t) => {
            const month = moment(t.date).format('MMM');

            if (!data[month]) {
                data[month] = { name: month, income: 0, expense: 0 };
            }

            if (t.type.toLowerCase() === 'income') {
                data[month].income += Number(t.amount);
            } else if (t.type.toLowerCase() === 'expense') {
                data[month].expense += Number(t.amount);
            }
        });

        return Object.values(data);
    }, [transactions]);

    // Group by Category (only expenses)
    const categoryData = useMemo(() => {
        const categoryTotals = {};

        transactions.forEach((t) => {
            if (t.type.toLowerCase() === 'expense') {
                const category = t.category || 'Other';
                categoryTotals[category] = (categoryTotals[category] || 0) + Number(t.amount);
            }
        });

        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    }, [transactions]);

    return (
        <div className="charts-section">
            <div className="chart-card">
                <h3>📊 Monthly Income vs Expenses</h3>
                <BarChart width={350} height={250} data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#4CAF50" />
                    <Bar dataKey="expense" fill="#F44336" />
                </BarChart>
            </div>

            <div className="chart-card">
                <h3>🧾 Expenses by Category</h3>
                <PieChart width={350} height={250}>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                        dataKey="value"
                    >
                        {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
};

export default Charts;
