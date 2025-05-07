import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "./Navbar";

import "./Admin.css";

export default function Analytics() {
    const [analyticsData, setAnalyticsData] = useState({
        bookings: 0,
        vrLinks: 0,
        feedback: 0,
        notifications: 0,
        products: 0,
        store: 0,
        users: 0,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const collections = [
                    { name: "Bookings", emoji: "📖" },
                    { name: "VRLinks", emoji: "🔗" },
                    { name: "feedback", emoji: "💬" },
                    { name: "notifications", emoji: "🔔" },
                    { name: "products", emoji: "🛒" },
                    { name: "store", emoji: "🏬" },
                    { name: "users", emoji: "👤" },
                ];

                const data = {};
                for (const collectionInfo of collections) {
                    const snapshot = await getDocs(collection(db, collectionInfo.name));
                    data[collectionInfo.name.toLowerCase()] = {
                        count: snapshot.size,
                        emoji: collectionInfo.emoji,
                    };
                }

                setAnalyticsData(data);
            } catch (error) {
                console.error("Error fetching analytics data: ", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="admin-dashboard">
            <Navbar />
            <h2 className="analytics-heading">Analytics Dashboard</h2>
            <div className="analyticsintro">

                    <div className="analytics-container">
                        {Object.entries(analyticsData).map(([key, value]) => (
                            <div className="analytics-box" key={key}>
                                <span className="analytics-emoji">{value.emoji}</span>
                                <h3 className="analytics-title">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                                <p className="analytics-count">{value.count} {value.count === 1 ? "item" : "items"}</p>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
}
