import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider, useUser } from "./context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";  

const AppRoutes = () => {
  const { token } = useUser();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!token ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!token ? <RegisterPage /> : <Navigate to="/" />}
      />
      <Route path="/pizza/:id" element={<Pizza />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/404" element={<NotFound />} /> 
      <Route path="*" element={<NotFound />} />  
    </Routes>
  );
};

const App = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleToggle = (isOpen) => {
    setIsNavbarOpen(isOpen); // Guardamos si el navbar está abierto o cerrado
  };

  return (
    <Router>
      <div className={`content ${isNavbarOpen ? 'navbar-open' : ''}`}>
        <UserProvider>
          <CartProvider>
            <Navbar onToggle={handleToggle} /> {/* Pasamos el handler al Navbar */}
            <AppRoutes />
          </CartProvider>
        </UserProvider>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
