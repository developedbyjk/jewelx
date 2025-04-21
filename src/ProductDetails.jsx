import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from './firebase';
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import './ProductDetails.css';
import { Link } from "react-router-dom";


export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id)

  const [product, setProduct] = useState(null);
  // console.log("PRODUCT ID >> " , product.id)
  console.log("product info>>>" , product)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id); // Assuming "Products" is your collection name
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToDatabase = async (productId) => {
      if (productId) {
        try {
          const docRef = await addDoc(collection(db, "Orders"), {
            orderid: productId,
            userId: auth.currentUser.uid,
            name: product.name || '',
            email: product.email || '',
            phone: product.phone || '',
            address: product.address || '',
            zip: product.zip || '',
            status: product.status || 'pending',
            createdAt: new Date().toISOString(),
            img: product.image || '',
            price: product.price || '',
            description: product.description || '',

          });
          console.log("Document written with ID: ", docRef.id);
          navigate("/profile");
        } catch (error) {
          console.error("Error adding document: ", error.message);
          alert("Failed to add document: " + error.message);
        }
      }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      status: "pending"
    }));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div className="productdetailcontainer">

      <div className="tryvrbtn"><Link to={product.vrLink}>Try it Virtually</Link></div>

        <div className="product-card-page-img">
           
              <img src={product.image} alt={product.name} />
          
            
        </div>

        <div className="productmoreinfo">

            <div className="product-details-page-payment">
              <h3>{product.title}</h3>
              <h5>{product.description}</h5>
              <p className="price">{product.price}</p>
            </div>

            <div className="file-details">         
           
              {/* <input type="text" name="name" placeholder="Add Name" value={product.name || ''} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Add Email" value={product.email || ''} onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Add Phone" value={product.phone || ''} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Add Address" value={product.address || ''} onChange={handleChange} required />
              <input type="text" name="zip" placeholder="Add Zip Code" value={product.zip || ''} onChange={handleChange} required /> */}
              <div className="products-buttons">
                <p>{product.id}</p>
              <Link to={`/products/checkout/${id}`} className="codepen-button" id="codepen-button-buy" >
                  <span>Order Now</span>
                </Link>
                {/* <a className="codepen-button" id="codepen-button-buy" onClick={() => addToDatabase(id)}>
                  <span>Order Now</span>
                </a> */}
              </div>
              <div className="products-buttons">
                <Link to={product.vrLink} className="codepen-button" id="codepen-button-buy" >
                  <span>Try in VR</span>
                </Link>
              </div>
            </div>
            
           
        </div>

    </div>
  );
}
