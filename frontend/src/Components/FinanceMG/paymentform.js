import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PaymentForm = () => {
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

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { cardNumber, expirationMonth, expirationYear, cvv, fullName, email, address, city, state, zipCode } = formData;
        const currentYear = new Date().getFullYear();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errors = {};

        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            errors.cardNumber = 'Card number must be 16 digits';
        }
        if (cvv.length !== 3 || isNaN(cvv)) {
            errors.cvv = 'CVV must be 3 digits';
        }
        if (expirationMonth < 1 || expirationMonth > 12) {
            errors.expirationMonth = 'Expiration month must be between 1 and 12';
        }
        if (expirationYear < currentYear) {
            errors.expirationYear = `Expiration year must be ${currentYear} or later`;
        }
        if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format';
        }
        if (fullName.trim() === '') {
            errors.fullName = 'Full name is required';
        }
        if (address.trim() === '') {
            errors.address = 'Address is required';
        }
        if (city.trim() === '') {
            errors.city = 'City is required';
        }
        if (state.trim() === '') {
            errors.state = 'State is required';
        }
        if (zipCode.length !== 5 || isNaN(zipCode)) {
            errors.zipCode = 'Zip code must be 5 digits';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((field) => {
                alert(errors[field]);
            });
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8070/payment/add',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            setSuccessMessage(response.data.message);

            // Clear form
            setFormData({
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
                zipCode: ''
            });

            // Navigate to /payments after successful form submission
            navigate('/payments');

        } catch (err) {
            setError(err.response?.data?.message || 'Error processing payment');
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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',  // Ensures container fills the height of the viewport
            backgroundColor: '#e0f7fa'
        }}>
            <div style={{
                margin: '20px',
                maxWidth: '600px',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#f9f9f9'
            }}>
                <h1 style={{ textAlign: 'center', color: '#333' }}>Payment Gateway</h1>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Card Type:</label>
                        <select
                            name="cardType"
                            value={formData.cardType}
                            onChange={handleChange}
                            required
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        >
                            <option value="">Select Card Type</option>
                            {cardTypes.map((card) => (
                                <option key={card.name} value={card.name}>
                                    {card.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        {cardTypes.map((card) => (
                            <div key={card.name} style={{ textAlign: 'center' }}>
                                <img src={card.imgSrc} alt={card.name} style={{ width: '50px', height: 'auto' }} />
                                <p style={{ fontSize: '12px' }}>{card.name}</p>
                            </div>
                        ))}
                    </div>

                    {[{ label: 'Card Number', name: 'cardNumber', type: 'text' },
                    { label: 'Expiration Month', name: 'expirationMonth', type: 'number' },
                    { label: 'Expiration Year', name: 'expirationYear', type: 'number' },
                    { label: 'CVV', name: 'cvv', type: 'text' },
                    { label: 'Full Name', name: 'fullName', type: 'text' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Address', name: 'address', type: 'text' },
                    { label: 'City', name: 'city', type: 'text' },
                    { label: 'State', name: 'state', type: 'text' },
                    { label: 'Zip Code', name: 'zipCode', type: 'text' }
                    ].map(({ label, name, type }) => (
                        <div key={name} style={{ marginBottom: '10px' }}>
                            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{label}:</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                required
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        style={{
                            padding: '10px',
                            width: '100%',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '15px'
                        }}
                    >
                        Proceed Checkout
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
