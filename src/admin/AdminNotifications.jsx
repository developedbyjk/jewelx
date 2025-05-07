import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the path to your firebase configuration
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Navbar from './Navbar'; // Adjust the path to your Navbar component

const AdminNotification = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const userList = userSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSendNotification = async () => {
        if (!selectedUser || !notification) {
            alert('Please select a user and write a notification.');
            return;
        }

        try {
            const notificationsCollection = collection(db, 'notifications');
            await addDoc(notificationsCollection, {
                userId: selectedUser,
                message: notification,
                timestamp: new Date(),
            });
            alert('Notification sent successfully!');
            setNotification('');
            setSelectedUser('');
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification.');
        }
    };

    return (
        <>
        
        <Navbar />
        <br /><br /><br />
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Send Notification</h2>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="user-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Select User:
                </label>
                <select
                    id="user-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                    }}
                >
                    <option value="">-- Select a User --</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="notification-text" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Notification:
                </label>
                <textarea
                    id="notification-text"
                    value={notification}
                    onChange={(e) => setNotification(e.target.value)}
                    placeholder="Write your notification here..."
                    style={{
                        width: '100%',
                        height: '100px',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        resize: 'none',
                    }}
                    />
            </div>
            <button
                onClick={handleSendNotification}
                style={{
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}
            >
                Send
            </button>
        </div>
                    </>
    );
};

export default AdminNotification;