import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../Signup/Signup.css';

export default function Signup({ handleSignup }) {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    async function UserSignup(event) {
        event.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3001/newUser', {
                name: name,
                userName: userName,
                password: password,
                contactNumber: contactNumber,
                address: address,
                role: role
            });
            console.log('Response status:', response.status);
            if (response.status === 200) {
                
               
                console.log('User created successfully:', response.data);
            } else {
                
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error creating user:', error);
           
        }
    }

    return (
        <div className='SignupMain'>
            <form className='SignupForm' onSubmit={UserSignup}>
                <h1 className='SignupH1'>Sign Up</h1>
                <input
                    className='SignupInput'
                    type='text'
                    required={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Full Name'
                />
                <br />
                <input
                    className='SignupInput'
                    type='text'
                    required={true}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='Username'
                />
                <br />
                <input
                    className='SignupInput'
                    type='password'
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <br />
                <input
                    className='SignupInput'
                    type='text'
                    required={true}
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder='Contact Number'
                />
                <br />
                <input
                    className='SignupInput'
                    type='text'
                    required={true}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Address'
                />
                <br />
                <select
                    className='SignupInput'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required={true}
                >
                    <option value=''>Select Role</option>
                    <option value='employee'>Employee</option>
                    <option value='admin'>Admin</option>
                </select>
                <br />
                <button className='LoginButton' type='submit'>Sign Up</button>
                <span>Already a user?</span><button className='LoginButton'onClick={() => navigate('/login')}>Log in</button>
            </form>
        </div>
    );
}
