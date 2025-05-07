import React, { useEffect, useState } from "react";
import './Admin.css';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';

export default function Admin() {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [user, Setuser] = useState(null); // ✅ Added missing state
    const [alluser, setAlluser] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth State Changed:", user);

            if (
                user &&
                (
                    user.email === "designedbyjk123@gmail.com" ||
                    user.email === "developedbyjk@gmail.com" ||
                    user.email === "mvhora255@gmail.com" ||
                    user.email === "lalazahiruddin@gmail.com"
                )
            ) {
                Setuser(user);
            } else {
                console.log("user not signed in or unauthorized");
                Navigate("/admin/login");
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [Navigate]);

    useEffect(() => {
        if (user) {
            Navigate("/admin");
        }
    }, [user, Navigate]);

    return (
        <div>
            <Navbar />
            <div className="adminboxes">
                <Link to="/admin/products" className="adminbox">
                    <div>
                        <h1>📦</h1>
                        <h3>Manage <br />Products</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>

                <Link to="/admin/orders" className="adminbox">
                    <div>
                        <h1>🛍️</h1>
                        <h3>Manage <br />Bookings</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>

                <Link to="/admin/users" className="adminbox">
                    <div>
                        <h1>👤</h1>
                        <h3>Manage<br /> Users</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>

                <Link to="/admin/vrs" className="adminbox">
                    <div>
                        <h1>👁️</h1>
                        <h3>Manage <br />Vr’s</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>

                <Link to="/admin/feedback" className="adminbox">
                    <div>
                        <h1>💬</h1>
                        <h3>View <br />Feedback</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>


                
                <Link to="/admin/storetime" className="adminbox">
                    <div>
                        <h1>📅</h1>
                        <h3>Manage <br />Store Availability</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>


               
                <Link to="/admin/notifications" className="adminbox">
                    <div>
                        <h1> 📩</h1>
                        <h3>Send <br />Notifications</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>


                
                <Link to="/admin/analytics" className="adminbox">
                    <div>
                        <h1> 📊</h1>
                        <h3>Manage <br />Analytics </h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>
            </div>
{/* 
            <div className="adminpanel">
                {orders.map((order) => (
                    <div key={order.id} className="order-item">
                        <p>Order ID: {order.id}</p>
                        <p>User Name: {order.userName}</p>
                        <p>Product Name: {order.productName}</p>
                        <p>Details: {JSON.stringify(order)}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
}
