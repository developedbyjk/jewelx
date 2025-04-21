import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import Navbar from "./Navbar";
import "./Products.css";

export default function Products() {
  const [productFrom, setproductFrom] = useState(false);
  const [productindb, setProductindb] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [product, setProduct] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    vrLink: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsdata = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductindb(productsdata);
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "product_upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxczf1yvj/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Image uploaded:", data);
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      setUploading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.title || !product.description || !product.vrLink) {
      alert("Please fill in all fields.");
      return;
    }

    const imageUrl = imageFile ? await uploadImageToCloudinary() : product.image;
    if (editingId) {
      await updateDoc(doc(db, "products", editingId), {
        ...product,
        image: imageUrl,
      });
      setEditingId(null);
    } else {
      await addDoc(collection(db, "products"), {
        ...product,
        image: imageUrl,
        userId: auth.currentUser?.uid,
      });
    }

    setProduct({ image: "", title: "", description: "", price: "", vrLink: "" });
    setImageFile(null);
    setproductFrom(false);
  };

  const handleEdit = (prod) => {
    setProduct(prod);
    setEditingId(prod.id);
    setproductFrom(true); // open form for editing
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "products", id));
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  function editProduct(id) {
    const productToEdit = productindb.find((product) => product.id === id);
    if (productToEdit) handleEdit(productToEdit);
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="featured-products-page">
          {productindb.map((product) => (
            <div key={product.id} className="product-card-page">
              <div>
                <img src={product.image} alt={product.title} />
              </div>

              <div className="product-details-page">
                <h3>{product.title}</h3>
                <h5>{product.description}</h5>

                <div className="products-buttons">
                  <p className="price">{product.price}</p>
                  <div
                    onClick={() => editProduct(product.id)}
                    className="codepen-button"
                  >
                    <span>Edit</span>
                  </div>
                  <div
                    onClick={() => handleDelete(product.id)}
                    className="codepen-button"
                    style={{ background: "#ff4d4d", marginLeft: "10px" }}
                  >
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productFrom ? (
          <form className="admin-product-form" onSubmit={handleSubmit}>
            <div className="file-input">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="file-details">
              <input
                type="text"
                placeholder="Add Title"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
                required
              />
              <div className="file-buttons">
                <input
                  type="text"
                  name="vrLink"
                  placeholder="Add VR Url"
                  value={product.vrLink}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Add Price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
                <button type="submit" disabled={uploading}>
                  {uploading
                    ? "Uploading..."
                    : editingId
                    ? "Update"
                    : "Submit"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          ""
        )}

        <div className="addnewproduct" onClick={() => setproductFrom(!productFrom)}>
          + Add New Product
        </div>
      </div>
    </>
  );
}
