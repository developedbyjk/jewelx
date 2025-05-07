import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingProcessing.css"; // Importing the CSS file

const BookingProcessing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-container">
      <div className="spinner"></div>
      <h2 className="payment-heading">Processing Your Booking...</h2>
      <p className="payment-text">Please wait while we confirm your Booking.</p>
    </div>
  );
};

export default BookingProcessing;
