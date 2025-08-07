import React from 'react';
import { CSVLink } from 'react-csv';
import './ExportCSV.css';
import moment from 'moment'; // for formatting dates

const headers = [
    { label: 'Date', key: 'Date' },
    { label: 'Title', key: 'Title' },
    { label: 'Amount', key: 'Amount' },
    { label: 'Category', key: 'Category' },
    { label: 'Description', key: 'Description' },
];

const ExportCSV = ({ transactions }) => {
    // Format the data for CSV
    const formattedData = transactions.map(txn => ({
        Date: `'${moment(txn.date).format('YYYY-MM-DD')}`,
        Title: txn.title,
        Amount: txn.amount,
        Category: txn.category,
        Description: txn.description,
    }));

    return (
        <div className="export-container">
            <CSVLink
                data={formattedData}
                headers={headers}
                filename={'expenses-data.csv'}
                className="csv-btn"
                target="_blank"
            >
                ⬇️ Export as CSV
            </CSVLink>
        </div>
    );
};

export default ExportCSV;
