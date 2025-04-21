import React, { useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import "./Admin.css"; // Import the CSS file
import Navbar from "./Navbar";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        const usersList = snapshot.docs.map(doc => doc.data());
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [db]);

  if (loading) {
    return <p className="admin-loading">Loading users...</p>;
  }

  return (

    <>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
    <div className="admin-panel">
       
      <h2 className="admin-title">👩‍💼 All Registered Users</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>UID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="admin-avatar"
                  />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.uid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                  </>
  );
}
