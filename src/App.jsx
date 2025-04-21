import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LandingPage from './LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './admin/Admin';
import Products from './admin/Products';
import Users from './admin/Users';
import Vrs from './admin/Vrs';
import Feedback from './admin/Feedback';
import LoginPage from './admin/LoginPage';
import Orders from './admin/Orders';

import UserProfile from './UserProfile';
import ProductsPage from './ProductsPage';
// import FeedbackPage from './FeedbackPage';

import ProductDetails from './ProductDetails';
import UserLoginPage from './UserLoginPage';

import Checkout from './CheckoutPage';

import Home from './Home';
import CheckoutPage from './CheckoutPage';

import PaymentProcessing from './PaymentProcessing';

// import Feedback from './Feedback';

import UserFeedback from './UserFeedback';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/vrs" element={<Vrs/>} />
          <Route path="/admin/feedback" element={<Feedback />} />
          <Route path="/admin/orders" element={<Orders />} />


          <Route path="/profile" element={<UserProfile />} />
          <Route path="/products" element={<ProductsPage />} />
          {/* <Route path="/feedback" element={<FeedbackPage />} /> */}


          <Route path="/loginpage" element={<UserLoginPage />} />



          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/payment" element={<PaymentProcessing />} />

          <Route path="/feedback" element={<UserFeedback />} />

          

          <Route path="/products/checkout/:id" element={<CheckoutPage />} />
        </Routes>
     </BrowserRouter>
    
    </>
  )
}

export default App
