import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import './Navbar.css';

const Navbar = ({ onToggle }) => {
  const { totalAmount } = useCart();
  const { token, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen); 
  };

  useEffect(() => {
    const handleResize = () => {

      if (window.innerWidth > 991 && isOpen) {
        setIsOpen(false);
        onToggle(false); 
      }
    };

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onToggle]); 


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('navbar-open');
    } else {
      document.body.classList.remove('navbar-open');
    }
  }, [isOpen]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link to="/" className="navbar-brand">Pizzería Mamma Mia!</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={isOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={toggleNavbar}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
        <ButtonGroup className="navbar-nav me-auto">
          <Link to="/" className="nav-item">
            <Button variant="outline-light">🍕 Home</Button>
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="nav-item">
                <Button variant="outline-light">🔓 Profile</Button>
              </Link>
              <Button
                variant="outline-light"
                className="nav-item btn-logout"
                onClick={logout}
              >
                🔒 Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">
                <Button variant="outline-light">🔐 Login</Button>
              </Link>
              <Link to="/register" className="nav-item">
                <Button variant="outline-light">🔐 Register</Button>
              </Link>
            </>
          )}
        </ButtonGroup>
        <div className="d-flex ml-auto">
          <Link to="/cart">
            <button className="btn btn-outline-info total-button">
              🛒 Total: ${totalAmount.toLocaleString()}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
