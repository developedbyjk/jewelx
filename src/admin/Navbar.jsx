import React from "react";
import { Link } from "react-router-dom";



export default function Navbar(){
    return (
            <nav className="adminnavbar">
                    <h3><Link to="/admin">Admin Panel</Link></h3>
                    <h3>Log out</h3>
                  </nav>
    )
}