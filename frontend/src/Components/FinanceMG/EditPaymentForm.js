// src/components/EditPaymentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPaymentForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        cardType: '',
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
        cvv: '',
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/payment/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };
        fetchPayment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/payment/update/${id}`, formData);
            alert('Payment updated successfully');
            window.location.href = '/payments'; // Redirect to payment list
        } catch (err) {
            console.error('Error updating payment:', err);
        }
    };

    const cardTypes = [
        { name: 'Visa', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
        { name: 'Mastercard', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
        { name: 'American Express', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg' },
        { name: 'Discover', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Commons-logo-en.svg/1556px-Commons-logo-en.svg.png' },
        { name: 'JCB', imgSrc: 'https://www.fintechfutures.com/files/2018/01/JCB-620x400.jpg' }
    ];

    return (
        <div className="container mt-5">
            <h1>Edit Payment</h1>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label className="form-label">Card Type:</label>
                    <select
                        name="cardType"
                        value={formData.cardType}
                        onChange={handleChange}
                        required
                        className="form-select"
                    >
                        <option value="">Select Card Type</option>
                        {cardTypes.map((card) => (
                            <option key={card.name} value={card.name}>
                                {card.name}
                            </option>
                        ))}
                    </select>
                    {cardTypes.map((card) => (
                        card.name === formData.cardType && (
                            <div key={card.name} className="text-center my-2">
                                <img src={card.imgSrc} alt={card.name} style={{ width: '50px' }} />
                            </div>
                        )
                    ))}
                </div>
                {['cardNumber', 'expirationMonth', 'expirationYear', 'cvv', 'fullName', 'email', 'address', 'city', 'state', 'zipCode'].map(field => (
                    <div className="mb-3" key={field}>
                        <label className="form-label">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                        <input
                            type={field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Update Payment</button>
            </form>
        </div>
    );
};

export default EditPaymentForm;
