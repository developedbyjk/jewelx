import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { db } from "./firebase"; // Adjust the import path as necessary
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [storeTiming, setStoreTiming] = useState({ openingTime: "", closingTime: "" });

  useEffect(() => {
    const fetchStoreTiming = async () => {
      try {
        const docRef = doc(db, "store", "timing");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStoreTiming(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching store timing:", error);
      }
    };

    fetchStoreTiming();
  }, []);

  return (
    <div className="navbarcontainer">
      <nav className="navbar">
        <h1 className="logo">
          <Link to="/">JewelX</Link>
        </h1>
        <ul className="nav-links">
          <li>
            <Link to="/products">Products</Link>
          </li>
          {/* <li><Link to="/tryvr">Try VR</Link></li> */}
          {/* <li>
            <Link to="/support">Support</Link>
          </li> */}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {/* <li>
            <Link to="/about">About</Link>
          </li> */}
          <li>
          <Link to="/">
           ⏲️ Store Timing: {storeTiming.openingTime} - {storeTiming.closingTime}
            </Link>
          </li>
        </ul>
        {/* <div className="store-timing">
         
        </div> */}
        <div className="icons">
          <Link to="/profile">
            <CgProfile className="icon" />
          </Link>
          {/* <FaShoppingCart className="icon" /> */}
        </div>
      </nav>
    </div>
  );
}