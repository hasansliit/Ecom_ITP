// src/components/PaymentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';  // Import jsPDF for generating PDFs
import 'jspdf-autotable';   // Import the plugin for auto-generating tables

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:8070/payment');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };
        fetchPayments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/payment/delete/${id}`);
            setPayments(payments.filter(payment => payment._id !== id));
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    // Search filter logic
    const filteredPayments = payments.filter(payment =>
        payment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Report generator with header and footer
    const generateReport = () => {
        const doc = new jsPDF();

        // Define the page margins and size
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Add report title at the top of each page
        const header = () => {
            doc.setFontSize(18);
            doc.text('Payment Report', pageWidth / 2, 15, { align: 'center' });
        };

        // Add page number at the bottom
        const footer = (pageNum) => {
            doc.setFontSize(10);
            const totalPages = doc.internal.getNumberOfPages();
            doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        };

        // Add the header and footer for each page
        const addHeaderFooter = () => {
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                header();
                footer(i);
            }
        };

        // Add the table content
        doc.autoTable({
            head: [['Full Name', 'Card Type', 'Card Number', 'Expiration Date', 'CVV', 'Email', 'Address', 'City', 'State', 'Zip Code']],
            body: filteredPayments.map(payment => [
                payment.fullName,
                payment.cardType,
                payment.cardNumber,
                `${payment.expirationMonth}/${payment.expirationYear}`,
                payment.cvv,
                payment.email,
                payment.address,
                payment.city,
                payment.state,
                payment.zipCode
            ]),
            startY: 25,  // Starting point of the table, leaving space for the header
            didDrawPage: function (data) {
                // Ensure the header is added after the first page is drawn
                header();
            }
        });

        // Add headers and footers to all pages
        addHeaderFooter();

        // Save the document
        doc.save('payment_report.pdf');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Payments</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name or Email"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Report Generator Button */}
            <div className="text-end mb-3">
                <button className="btn btn-primary" onClick={generateReport}>Generate Report</button>
            </div>

            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Full Name</th>
                        <th>Card Type</th>
                        <th>Card Number</th>
                        <th>Expiration Date</th>
                        <th>CVV</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.map(payment => (
                        <tr key={payment._id}>
                            <td>{payment.fullName}</td>
                            <td>{payment.cardType}</td>
                            <td>{payment.cardNumber}</td>
                            <td>{payment.expirationMonth}/{payment.expirationYear}</td>
                            <td>{payment.cvv}</td>
                            <td>{payment.email}</td>
                            <td>{payment.address}</td>
                            <td>{payment.city}</td>
                            <td>{payment.state}</td>
                            <td>{payment.zipCode}</td>
                            <td>
                                <Link to={`/edit/${payment._id}`}>
                                    <button className="btn btn-success me-2">Edit</button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(payment._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentList;
