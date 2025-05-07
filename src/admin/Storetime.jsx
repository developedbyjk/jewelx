import React, { useState } from 'react';
import Navbar from './Navbar';
import { db } from '../firebase'; // Import your Firebase configuration
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods

const Storetime = () => {
    const [storeTime, setStoreTime] = useState({
        openingTime: '',
        closingTime: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreTime((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save the updated store timing to Firestore
            const storeTimeRef = doc(db, 'store', 'timing'); // Adjust the path as needed
            await setDoc(storeTimeRef, storeTime);
            console.log('Store timing updated successfully:', storeTime);
            alert('Store timing updated successfully!');
        } catch (error) {
            console.error('Error updating store timing:', error);
            alert('Failed to update store timing. Please try again.');
        }
    };

    return (
        <>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Update Store Timing</h2>
            <br /><br />
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="openingTime" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Opening Time:</label>
                    <input
                        type="time"
                        id="openingTime"
                        name="openingTime"
                        value={storeTime.openingTime}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="closingTime" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Closing Time:</label>
                    <input
                        type="time"
                        id="closingTime"
                        name="closingTime"
                        value={storeTime.closingTime}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Update Timing
                </button>
            </form>
        </div>
        </>
    );
};

export default Storetime;