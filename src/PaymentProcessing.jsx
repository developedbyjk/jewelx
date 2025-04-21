import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentProcessing.css"; // Importing the CSS file

const PaymentProcessing = () => {
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
      <h2 className="payment-heading">Processing Your Payment...</h2>
      <p className="payment-text">Please wait while we confirm your transaction.</p>
    </div>
  );
};

export default PaymentProcessing;
