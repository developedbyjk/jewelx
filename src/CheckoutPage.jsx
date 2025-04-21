import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Controlled input states
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          console.error("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Orders"), {
        orderid: id,
        userId: auth.currentUser.uid,
        name: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
        address,
        phone,
        zip,
        status: "pending",
        createdAt: new Date().toISOString(),
        img: product?.image || "",
        price: product?.price || "",
        title: product?.title || "",
        description: product?.description || "",
      });

      alert("Order placed successfully!");
      navigate("/payment");
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Failed to place order.");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="checkout-container">
      <div className="payment-section">
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input type="email" placeholder="you@example.com" defaultValue={auth.currentUser.email} disabled />

          <label>Credit Card Number</label>
          <input type="text" placeholder="xxxx xxxx xxxx xxxx" required />

          <div className="inline-fields">
            <div>
              <label>Expiry Date</label>
              <input type="text" placeholder="MM / YY" required />
            </div>
            <div>
              <label>CVV</label>
              <input type="text" placeholder="xxx" required />
            </div>
          </div>

          {/* Controlled address input */}
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          {/* Controlled phone input */}
          <label>Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {/* Controlled zip input */}
          <label>ZIP Code</label>
          <input
            type="text"
            placeholder="Enter ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />

          <div className="price-summary">
            <div className="row">
              <span>Subtotal</span>
              <span>{product.price}</span>
            </div>

            <div className="row total">
              <span>Total Amount</span>
              <span>{product.price}</span>
            </div>
          </div>

          <button type="submit" className="pay-button">Make Payment</button>
        </form>
      </div>

      <div className="summary-section">
        <img src={product.image} alt={product.title} />
        <h3 id="uniqueid">{product.title}</h3>
      </div>
    </div>
  );
};

export default CheckoutPage;
