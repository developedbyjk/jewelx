import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";



export default function Navbar(){
    return (
      <div className="navbarcontainer">

        <nav className="navbar">
          <h1 className="logo"><Link to="/">JewelX</Link></h1>
          <ul className="nav-links">

            <li><Link to="/products">Products</Link></li>
            <li><Link to="/tryvr">Try VR</Link></li>
            {/* <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li> */}
           
          </ul>
          <div className="icons">
            <Link to="/profile"><CgProfile className="icon" /></Link>
            {/* <FaShoppingCart className="icon" /> */}
          </div>
        </nav>
      </div>
      );
}