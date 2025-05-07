import React, { useState, useEffect, useRef } from 'react';
import './Contact.css'; // Import your CSS file for styling
import Navbar from './Navbar';

export default function Contact() {


    
  return (
    <>
    <Navbar />
    <div className="contact">
        <div>
            <img src="mycontact.jpg" alt="" />
        </div>
        <div>
            <h3>📧 help@jewelX@gmail.com</h3>
            <h3>📞 +91 1234567890</h3>
            <h3>📍 Canada</h3>
        </div>
      
    </div>
    </>
  );
}