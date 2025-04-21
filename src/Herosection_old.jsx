import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroSection.css';

// const jewelryImages = [
//   'https://i.pinimg.com/736x/d5/8f/90/d58f903b7674bffae7db7314c56d8cfe.jpg',
//   'https://i.pinimg.com/736x/7f/d3/39/7fd3397b68a553c42ce3195dca117973.jpg',
//   'https://i.pinimg.com/736x/70/30/bb/7030bb69b57d295fddf2d5b20406f313.jpg',
//   'https://i.pinimg.com/736x/88/4e/18/884e18e909cd8aedecb7a8c04259d6e9.jpg',
// ];



const jewelryImages = [
    'https://i.pinimg.com/736x/d5/8f/90/d58f903b7674bffae7db7314c56d8cfe.jpg',
     'https://i.pinimg.com/736x/7f/d3/39/7fd3397b68a553c42ce3195dca117973.jpg',
     'https://i.pinimg.com/736x/70/30/bb/7030bb69b57d295fddf2d5b20406f313.jpg',
     'https://i.pinimg.com/736x/88/4e/18/884e18e909cd8aedecb7a8c04259d6e9.jpg',
   ]; // Add as many images as you want

const HeroSection = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showImage, setShowImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timeoutRef = useRef(null);
  const lastMoveTime = useRef(0);

  const handleMouseMove = (e) => {
    const now = Date.now();
    const timeSinceLastMove = now - lastMoveTime.current;

    // Only show a new image if enough time has passed
    if (timeSinceLastMove > 150) {
      lastMoveTime.current = now;

      // Update cursor position
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Show image
      setShowImage(true);

      // Hide image after delay
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowImage(false);
      }, 500);

      // Move to next image on next move
      setCurrentImageIndex((prev) => (prev + 1) % jewelryImages.length);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hero-section">
      {/* <h1 className="hero-heading">Elegant Jewelry Collection</h1> */}

         <div className="hero-text">
         <h2>Experience the Era <br/> of AR Fashion</h2>
     <br />
         <p>Discover a world where beauty meets Technology, <br/>where every piece of jewelry tells a story.</p>
         <br />
         <button className="shop-btn">Shop Now</button>
       </div>

      <AnimatePresence>
        {showImage && (
          <motion.img
            key={currentImageIndex}
            src={jewelryImages[currentImageIndex]}
            alt="Cursor Jewelry"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              left: cursorPosition.x,
              top: cursorPosition.y,
            }}
            exit={{ opacity: 0.7, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'fixed',
              width: 200,
              height: 'auto',
              transform: 'none',
              pointerEvents: 'none',
              zIndex: 10,
              borderRadius: '10px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;





