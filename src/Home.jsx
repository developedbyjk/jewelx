import React from "react";
import { FaShoppingCart, FaSearch,  } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Herosection.css";
// import HeroSection from "./Herosection";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h1 className="logo">JewelX</h1>
//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/products">Shop</Link></li>
//         <li>About Us</li>
//         <li>Pages</li>
//       </ul>
//       <div className="icons">
//         <Link to="/profile"><CgProfile className="icon" /></Link>
//         {/* <FaShoppingCart className="icon" /> */}
//       </div>
//     </nav>
//   );
// };

const HeroSection = () => {
  return (
    <div className="hero">
      
      <div className="hero-text">
        <h2>Experience the Era <br/>of <sapn id="arfashiontext"> AR Fashion</sapn></h2>
    <br />
        <p>Discover a world where beauty meets Technology, <br/>where every piece of jewelry tells a story.</p>
        <br />
        <button className="shop-btn"><Link to="/products">Shop </Link></button>
      </div>

      <img src="https://i.postimg.cc/KYj19xYK/image-removebg-preview-53.png" id="limg1" alt="Jewelry Model" />
<img src="https://i.postimg.cc/RZW0xGch/image-removebg-preview-54.png"  id="limg2" alt="" />
    
    </div>
  );
};

const Features = () => {
  return (
    <div className="features">
      {[
        {icons: "workspace_premium", title: "Certified", desc: "Available certificates of authenticity" },
        { icons:"lock" , title: "Secure", desc: "Certified marketplace since 2024" },
        { icons:"local_shipping" , title: "Shipping", desc: "Free, fast, and reliable worldwide" },
        {  icons:"check_circle" , title: "Transparent", desc: "Hassle-free return policy" },
      ].map((feature, index) => (
        <div key={index} className="feature-card">
          <span class="material-symbols-outlined">{feature.icons}</span>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </div>
      ))}
    </div>
  );
};

const JewelryCollection = () => {
  return (
    <div className="jewelry-collection">
      <h2>Sparkle in Elegance</h2>
      {/* <div className="categories">
        {[
          "Necklaces",
          "Earrings",
          "Bracelets",
          "Rings",
          "Pendants",
        ].map((category, index) => (
          <span key={index} className="category">{category}</span>
        ))}
      </div> */}
      <div className="featured-products">
        {[
          { name: "Gold Necklace", price: "$120.00", img: "https://thefuncompany.in/cdn/shop/files/TFCboldandgoldbeadsandpearllayerednecklace_986c0842-34ad-4584-902d-89eb6cf1490e.jpg?v=1738838639" },
          { name: "Diamond Ring", price: "$350.75", img: "https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw72522146/images/hi-res/3023FEL.jpg?sw=640&sh=640" },
          { name: "Copper Gold Bracelet", price: "$80.25", img: "https://zivom.com/cdn/shop/files/B2703LWGBFAH-FI-1_92f13e08-9db3-4ad1-a82c-4c85b7dc5ff7.jpg?v=1737527833" },
          
          { name: "Chain Necklace Gold", price: "$150.00", img: "https://www.orelia.co.uk/cdn/shop/products/Orelia_5_17_02_2249507_1000x1000.jpg" },
          { name: "Diamond Brooch", price: "$78.00", img: "https://rukminim3.flixcart.com/image/850/1000/xif0q/brooch/h/w/r/brooch-flower-fashion-crystal-rhinestone-brooch-for-women-girl-original-imagwgxygszkkwmk.jpeg?q=20&crop=false" },

          { name: "Rubans Silver-Plated EmeraldGreen & White", price: "$78.00", img: "https://d25xd2afqp2r8a.cloudfront.net/products/222100_RUBYGREEN_440x440.JPG" },

          { name: "Kemp Mango Haar Necklace Set By Asp Fashion", price: "$78.00", img: "https://aspfashionjewellery.com/cdn/shop/products/Picsart_23-04-23_15-32-45-733.jpg?v=1682255580" },

          { name: " Ruby Christa Victorian Jewellery Set - New Arrival", price: "$98.00", img: "https://blingbag.co.in/cdn/shop/files/RubyChristaVictorianJewellerySet_3_1080x.jpg?v=1723790270" },



          
        ].map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            {/* <p>{product.price}</p> */}
            {/* <button>Buy</button> */}
          </div>
        ))}
        
      </div>
      <div id="moreproductbtn"><Link to="/products">More Products </Link></div>
    </div>
  );
};

const JewelryStyles = () => {
  return (
    <div className="jewelry-styles">
      <div className="style-content">
        <h2>Jewelry Unique Styles</h2>
        <br/>  <br/>
        <p>Discover the many variations of exquisite Lavish styled accessories, featuring modern and vintage-inspired designs.</p>
        <br/>  <br/>
        <button className="blackbtn">Try Now</button>
      </div>
      <div className="style-image">
        <img src="iii.jpg" alt="" />
      </div>
    </div>
  );
};
const Offers = () => {
  return (
    <div className="jewelry-styles">
        <div className="offer-image">
        <img src="https://i.pinimg.com/736x/5e/82/f9/5e82f93a3178b1fa116f9b49f44e71fa.jpg" alt="Offer Model" />
      </div>
      <div className="offer-content">
        <h2>Get 30% off this week</h2>  
        <br/>  <br/>
        <p>Unleash Your Cravings,  <br/> Not Your Wallet!</p>
        <br/>  <br/>
        <button className="blackbtn">Shop Now</button>
      </div>
    
    </div>
  );
};
const Articles = () => {
  return (
    <div className="articles">
      <h2>Articles & Resources</h2>
      <br /><br />
      <div className="article-list">
        {[
          { title: "Lavish Perfection", date: "January 16, 2024", desc: "Behind the scenes crafting Lavish perfection", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNYOnJSsSxVM81RDO5xE8Q8w_-IVFBr_ZKkz1ADMB5vFc6PAhgxeMsEGRk5Uf3uROKflw&usqp=CAU" },
          { title: "Crafty Jewels", date: "January 15, 2024", desc: "Crafty pieces tell a story of craftsmanship that transcends trends", img: "https://i.pinimg.com/736x/1e/bf/6b/1ebf6b708e429e16d63a6ae6adb78e0b.jpg" },
          { title: "Lavish Love", date: "January 15, 2024", desc: "Where we explore the Lavish lifestyle", img: "https://steorrajewels.com/cdn/shop/files/WhatsAppImage2024-10-24at10.07.23AM.jpg?v=1729744892&width=1500" },
        ].map((article, index) => (
          <div key={index} className="article-card">
            <img src={article.img} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.date}</p>
            <p>{article.desc}</p>
            <a href="#">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};
const InstagramWall = () => {
  return (
    <div className="instagram-wall">
      <h2>Instagram Wall</h2>
      <p>Follow us on Instagram and be part of the Lavish story</p>
      <div className="instagram-images">
        {["https://i.pinimg.com/736x/e7/80/35/e780356532f3a34dc6147cdcf726186b.jpg","https://i.pinimg.com/736x/8b/51/1f/8b511f48764ccda25751739a22772d73.jpg","https://i.pinimg.com/736x/57/e3/03/57e303cc1cb25c1a69ef103d3ba3b6e7.jpg","https://i.pinimg.com/736x/78/27/99/782799f43ef4df638d5e86edf5153c79.jpg","https://i.pinimg.com/736x/b8/e0/9f/b8e09fe56fd76575d1abdea869ae2b8c.jpg", "https://i.pinimg.com/736x/35/9e/a8/359ea83b8a150f4b0a5198149610439f.jpg", "https://i.pinimg.com/736x/c8/53/26/c85326561c4a4663915c8e0cc47e5e90.jpg", "https://i.pinimg.com/736x/d2/9d/61/d29d611c74a2d62cdba133b91eaa0a88.jpg", "https://i.pinimg.com/736x/c2/65/ea/c265ea5a27f57dda0d29c24580414c46.jpg", "https://i.pinimg.com/736x/02/82/a1/0282a1e6702f798a6d30fa21f68d6e27.jpg"].map((img, index) => (
          <img key={index} src={`${img}`} alt="Instagram post" />
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Discover timeless jewelry crafted with precision and elegance.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Product</li>
            <li>Contact</li>
         
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@radel.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      <p className="footer-bottom">&copy; 2025 JewelX Company. All rights reserved.</p>
    </footer>
  );
};

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <JewelryCollection />
      <JewelryStyles />
      <Offers />
      <Articles />
      <InstagramWall />
      <Footer />
    </div>
  );
};

export default Home;