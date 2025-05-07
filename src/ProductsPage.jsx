import React from "react";
import './mapp.css'
import { Link } from "react-router-dom";
// import {products} from './productinfo.js'
import CircleBtn from "./Components/CircleBtn";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./Navbar";

import { auth, db } from './firebase';


import { addDoc, updateDoc, deleteDoc, doc, collection, onSnapshot } from "firebase/firestore";



let products = [
  { id: 1, name: "Gold Necklace", price: "$120.00", img: "p/x (1).jpg", description: "Elegant gold necklace perfect for any occasion." },
  { id: 2, name: "Diamond Ring", price: "$350.75", img: "p/x (2).jpg", description: "Stunning diamond ring to make your moments special." },
  { id: 3, name: "Copper Gold Bracelet", price: "$80.25", img: "p/x (3).jpg", description: "Beautiful copper gold bracelet with intricate design." },
  { id: 4, name: "Zircon Gold Plated Ring", price: "$95.75", img: "p/x (4).jpg", description: "Gold plated ring with sparkling zircon stones." },
  { id: 5, name: "Sapphire Pendant", price: "$150.50", img: "p/x (5).jpg", description: "Charming sapphire pendant for a touch of elegance." },
  { id: 6, name: "Ruby Stud Earrings", price: "$210.99", img: "p/x (6).jpg", description: "Radiant ruby stud earrings for a classic look." },
  { id: 7, name: "Platinum Wedding Band", price: "$599.00", img: "p/x (7).jpg", description: "Timeless platinum wedding band for your special day." },
  { id: 8, name: "Emerald Brooch", price: "$325.50", img: "p/x (8).jpg", description: "Exquisite emerald brooch to enhance your outfit." },
  { id: 9, name: "Silver Charm Bracelet", price: "$45.00", img: "p/x (9).jpg", description: "Delicate silver charm bracelet for everyday wear." },
  { id: 10, name: "Pearl Drop Earrings", price: "$125.99", img: "p/x (10).jpg", description: "Graceful pearl drop earrings for a sophisticated look." },
  { id: 11, name: "Crystal Anklet", price: "$55.25", img: "p/x (11).jpg", description: "Stylish crystal anklet to complement your style." },
  { id: 12, name: "Titanium Cufflinks", price: "$95.50", img: "p/x (12).jpg", description: "Durable titanium cufflinks for a polished appearance." },
  { id: 13, name: "Garnet Cocktail Ring", price: "$135.75", img: "p/x (13).jpg", description: "Bold garnet cocktail ring for a statement look." },
  { id: 14, name: "Amethyst Choker", price: "$189.00", img: "p/x (14).jpg", description: "Elegant amethyst choker for a royal touch." },
  { id: 15, name: "Opal Nose Pin", price: "$49.99", img: "p/x (15).jpg", description: "Chic opal nose pin for a subtle sparkle." },
  { id: 16, name: "Turquoise Bead Necklace", price: "$89.95", img: "p/x (16).jpg", description: "Vibrant turquoise bead necklace for a boho vibe." },
  { id: 17, name: "Quartz Wristwatch", price: "$250.00", img: "p/x (17).jpg", description: "Classic quartz wristwatch for timeless style." }
];


export default function ProductsPage() {


  function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/loginpage");
        }
      });

      return () => unsubscribe();
    }, [navigate]);
  }

  useAuthRedirect();

const [productfromadmin, setproductfromadmin] = React.useState([]);
console.log(productfromadmin)


 useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
            const productsdata = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setproductfromadmin(productsdata);
        });
        return () => unsubscribe();
    }, []);




const vrpoducts = products.map((product, index) => (
    <div key={index} className="product-card-page">
      <div>
      <img src={product.img} alt={product.name} />
      </div>
      <div className="product-details-page">
        <h3>{product.name}</h3>
        <h5>{product.description}</h5>
        <p className="price">{product.price}</p>

        <div className="products-buttons">
        <CircleBtn/>
        {/* <a className="codepen-button"></a> */}
        <Link to={`/product/${product.id}`} className="codepen-button">
        <span>Buy Now</span>
        </Link>
        </div>
        {/* <Link to={`/product/${product.id}`}>View Details</Link> */}
      </div>
    </div>
  ))

  const productsfromdb = productfromadmin.map((product, index) => (
    <div key={index} className="product-card-page">
      <div>
      <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details-page">
        <h3>{product.title}</h3>
        <h5>{product.description}</h5>
        <p className="price">{product.price}</p>
        <p>{product.vrlink}</p>

        {/* <p>add feedback</p> */}

        <div className="products-buttons">
        <CircleBtn mylink={product.vrLink}/>
        {/* <a className="codepen-button"></a> */}
        <Link to={`/products/${product.id}`} className="codepen-button">
        <span>Book an Appointment </span>
        </Link>
        </div>
        {/* <Link to={`/product/${product.id}`}>View Details</Link> */}
      </div>
    </div>
  ))


    return(
        <>
       <Navbar/>
        <div className="featured-products-page">
          {/* <div id="navbarp"> */}

         
          {/* </div> */}
        <span id="productstitle">Our Products</span>
            {productfromadmin.length > 0 ? (
                productsfromdb
            ) : (
                <p>No products available at the moment. Please check back later.</p>
            )}
        </div>
        </>
    )
}