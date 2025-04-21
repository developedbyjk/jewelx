import React from "react";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { Link } from "react-router-dom";
import { auth, db } from './firebase';
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, deleteDoc} from "firebase/firestore";
import Navbar from "./Navbar";
import CircleBtn from "./Components/CircleBtn";
// import {  addDoc, collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function UserProfile() {
    const [userInfo, setUserInfo] = React.useState(null);
    console.log("USER INFO", userInfo)
    const [uid, setUid] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    console.log("PRODUCT INFOO", products)
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
            if (uid) {
                try {
                    const productsRef = collection(db, "Orders");
                    const q = query(productsRef, where("userId", "==", uid));
                    console.log("USER ID", q)
                   

                    console.log("UID", uid)
                    const querySnapshot = await getDocs(q);
                    const fetchedProducts = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setProducts(fetchedProducts);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            }
        };

        fetchProducts();
    }, [uid]);

async function cancelorder(id) {
    try {
        const orderRef = doc(db, "Orders", id);
        await deleteDoc(orderRef);
        console.log("Order cancelled successfully");

        // Update the local state to reflect the deletion
        // setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    } catch (error) {
        console.error("Error cancelling order:", error);
    }
}

    return (
        <>
        <Navbar/>
    

            <div className="profilecontainer">
                <div className="profilemyinfo">
                   
                    <img src={userInfo?.photoURL} alt="" />
                    <h1 className="profilemyinfo-title"> {userInfo?.displayName}</h1>
                    <p className="profilemyinfo-email"> {userInfo?.email}</p>
                    <br /><br />
                    <div className="feedback">
                        <Link to="/feedback" >Feedback ↗️</Link>
                    </div>
                    <br /><br /><br /><br /><br /><br />
                    <div className="blackbtn">
                    <Link to="/loginpage" className="profilemyinfo-logout" onClick={() => signOut(auth)}>Log out</Link>
                    </div>
                </div>
                <div className="profilemyorder">
                        {userInfo ? (
                <div className="user-profile">
               

                    <div className="userproductinfo">
                        {/* <h2 className="userproductinfo-title"><Link to="/">Home </Link> || Your Orders</h2> */}
                        {products.length > 0 ? (
                            <div className="userproduct-list">
                                {products.map((product, index) => (
                                    <div className="userproduct" key={index}>
                                        <div className="userproduct-image">
                             
                                            <img src={product.img} alt={product.title} />
                                        </div>
                                        <div className="userproduct-details">    
                                            <h3 className="userproduct-title">{product.title}</h3>
                                            <p className="userproduct-description">{product.description}</p>
                                            <p className="userproduct-price">Price: {product.price}</p>
                                            {/* <p className="userproduct-description">ID : {product.id}</p> */}
                                            {/* <p className="userproduct-vrlink">
                                                <a href={product.vrLink} target="_blank" rel="noopener noreferrer">View in VR</a>
                                            </p> */}
                                            <br /><br />
                                            <div className="myprofilestatus">
                                                Status: {product.status}
                                            </div>
                                            <div className="myprofilecancelorder" onClick={() => cancelorder(product.id)}>
                                                Cancle Order
                                            </div>
                                            <span id ="myprofilevrlink">
                                                <CircleBtn   mylink={product.vrLink}/>
                                            </span>
                                            {/* <button className="userproduct-cancel-button" onClick={()=>cancelorder(product.id)}>Cancel Order</button> */}
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
