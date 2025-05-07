import React from "react";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import "./Orders.css";

export default function Orders() {
    const [userInfo, setUserInfo] = React.useState(null);
    const [uid, setUid] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserInfo(user);
                setUid(user.uid);
            } else {
                console.log("User not signed in");
                navigate("/loginpage");
            }
        });
    }, [navigate]);

    React.useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsRef = collection(db, "Bookings");
          const querySnapshot = await getDocs(productsRef);
          const fetchedProducts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }, []);

    async function cancelorder(id) {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            try {
                const orderRef = doc(db, "Bookings", id);
                await deleteDoc(orderRef);
                console.log("Order cancelled successfully");

                // Remove from UI
                setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
            } catch (error) {
                console.error("Error cancelling order:", error);
            }
        }
    }

    async function updatestatus(e) {
        const productId = e.target.id;
        const newStatus = e.target.value;
        const product = products.find((p) => p.id === productId);

        try {
            const orderRef = doc(db, "Bookings", product.id);
            await updateDoc(orderRef, { status: newStatus });
            console.log("Status updated successfully");

            // Update local state
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p.id === product.id ? { ...p, status: newStatus } : p
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    }

    return (
        <>
            <Navbar />

            <div className="profilecontainer">
                <div className="profilemyinfo">
                    <img src={userInfo?.photoURL} alt="" />
                    <h1 className="profilemyinfo-title"> {userInfo?.displayName}</h1>
                    <p className="profilemyinfo-email"> {userInfo?.email}</p>
                </div>

                <div className="profilemyorder">
                    {userInfo ? (
                        <div className="user-profile">
                            <div className="userproductinfo">
                                {products.length > 0 ? (
                                    <div className="userproduct-list">
                                        {products.map((product, index) => (
                                          <div className="amdinproductprofile">

                                            <div className="userproduct" key={index}>
                                                <div className="userproduct-image">
                                                    <img src={product.img} alt={product.title} />
                                                </div>

                                                <div className="userproduct-details">
                                                    <h3 className="userproduct-title">{product.title}</h3>
                                                    <p className="userproduct-description">{product.description}</p>
                                                    <p className="userproduct-price">Price: {product.price}</p>

                                                    <p><strong>Email:</strong> {product.email}</p>
                                                    <p><strong>Name:</strong> {product.name}</p>
                                                    <p><strong>Phone:</strong> {product.phone}</p>
                                                    <p><strong>Zip:</strong> {product.zip}</p>
                                                    <p><strong>Time:</strong> {product.preferredTime}</p>
                                                    <p><strong>Date:</strong> {product.preferredDate}</p>
                                                    {/* <p><strong>Order Date:</strong> {new Date(product.createdAt).toLocaleString()}</p> */}

                                                </div>
                                            </div>
                                                  <div>
                                                    
                                                    <div className="myprofilestatus">
                                                              <strong>Status:</strong>
                                                              <select
                                                                  id={product.id}
                                                                  value={product.status}
                                                                  onChange={updatestatus}
                                                              >
                                                                  <option value="pending">Pending</option>
                                                                  <option value="in delivery">Store Closed</option>
                                                                  <option value="cancelled">Cancelled</option>
                                                                  <option value="approved">Approved</option>
                                                              </select>

                                                                <div className="myprofilecancelorder" onClick={() => cancelorder(product.id)}>
                                                                Cancel Order
                                                            </div>
                                                    </div>

                                                          {/* <div className="myprofilecancelorder" onClick={() => cancelorder(product.id)}>
                                                              Cancel Order
                                                          </div> */}
                                                  </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="userproductinfo-empty">No products found.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="loading-message">Loading user info...</p>
                    )}
                </div>
            </div>
        </>
    );
}
