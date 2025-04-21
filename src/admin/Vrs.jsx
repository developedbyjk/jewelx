import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Navbar from "./Navbar";
import "./Products.css";

export default function ManageVR() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [vrLink, setVrLink] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setVrLink(product.vrLink || "");
  };

  const handleUpdate = async () => {
    if (!vrLink) return alert("VR link cannot be empty.");

    try {
      await updateDoc(doc(db, "products", editingId), {
        vrLink,
      });
      setEditingId(null);
      setVrLink("");
    } catch (error) {
      console.error("Error updating VR link:", error);
    }
  };

  const handleDeleteVr = async (id) => {
    const confirm = window.confirm("Are you sure you want to remove this VR link?");
    if (!confirm) return;

    try {
      await updateDoc(doc(db, "products", id), {
        vrLink: "",
      });
    } catch (error) {
      console.error("Error deleting VR link:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="section-heading">Manage VR Links</h2>
        <div className="featured-products-page">
          {products.map((product) => (
            <div key={product.id} className="product-card-page">
              <img src={product.image} alt={product.title} />

              <div className="product-details-page">
                <h3>{product.title}</h3>
                <p className="price">₹ {product.price}</p>

                {editingId === product.id ? (
                  <div 
                  className="file-buttons"
                  
                  >
                    <input
                      type="text"
                      placeholder="Update VR Link"
                      value={vrLink}
                      onChange={(e) => setVrLink(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="admin-products-buttons">
                    <button onClick={() => handleEdit(product)}>Edit VR</button>
                    <button
                      onClick={() => handleDeleteVr(product.id)}
                      style={{ background: "#ff4d4d", marginLeft: "10px" }}
                    >
                      Delete VR
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
