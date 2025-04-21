import React, { useEffect, useState } from "react";
import './Admin.css';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { addDoc, updateDoc, deleteDoc, doc, collection, onSnapshot, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const [orders, setOrders] = useState([]);
    console.log(orders)
    const [orderDetails, setOrderDetails] = useState([]);
    const Navigate = useNavigate();

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          console.log(user);
          if (user && user.email === "designedbyjk@gmail.com") {
            Setuser(user);
            Navigate("/admin");
          } else {
            console.log("user not signed in or unauthorized");
            Navigate("/admin/login");
          }
        });
      }, []); 


    const [alluser, setAlluser] = React.useState([]);

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
                        <h3>Manage <br />Orders</h3>
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
                        <h3>Manage <br />
                            Vr’s</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>

                <Link to="/admin/feedback" className="adminbox">
                    <div>
                        <h1>💬</h1>
                        <h3>View <br />
                            Feedback</h3>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                </Link>
            </div>

            <div className="adminpanel">
                {orders.map((order) => (
                    <div key={order.id} className="order-item">
                        <p>Order ID: {order.id}</p>
                        <p>User Name: {order.userName}</p>
                        <p>Product Name: {order.productName}</p>
                        <p>Details: {JSON.stringify(order)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}