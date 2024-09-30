import React, { useState, useEffect, useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { useCart } from '../context/CartContext';
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, totalAmount, setCart } = useCart();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        if (!response.ok) {
          throw new Error("Error al cargar los datos de las pizzas en cart");
        }
        const data = await response.json();
        initializeCart(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const initializeCart = (pizzasData) => {
    const cartWithDetails = cart.map((cartItem) => {
      const pizza = pizzasData.find((pizza) => pizza.id === cartItem.id);
      return pizza ? { ...pizza, count: cartItem.count } : null;
    }).filter(item => item !== null);

    setCart(cartWithDetails);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage("No hay pizzas añadidas para pagar.");
      return;
    }

    if (!token) {
      setMessage("Por favor, inicie sesión para realizar el pago.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ cart })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al realizar el pago");
      }

      const data = await response.json();
      setMessage("Compra realizada exitosamente.");
      setCart([]);

    } catch (error) {
      setMessage("");
      setError(`Error al procesar la compra: ${error.message}`);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <h2>Detalle del pedido:</h2>
      {cart.length > 0 ? (
        cart.map((pizza) => (
          <div key={pizza.id} className="cart-item d-flex align-items-center mb-3">
            <Image src={pizza.img} roundedCircle style={{ width: "60px", height: "60px" }} />
            <div className="ms-3 flex-grow-1">
              <h5>{pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)}</h5>
            </div>
            <div className="d-flex align-items-center">
              <Button
                variant="success"
                onClick={() => decreaseQuantity(pizza.id)}
                className="me-2"
              >
                -
              </Button>
              <span className="me-2">{pizza.count}</span>
              <Button
                variant="success"
                onClick={() => increaseQuantity(pizza.id)}
                className="me-2"
              >
                +
              </Button>
              <span>=</span>
              <strong className="ms-2">
                ${(pizza.price * pizza.count).toLocaleString()}
              </strong>
            </div>
          </div>
        ))
      ) : (
        <p>No hay pizzas en el carrito</p>
      )}
      <hr />
      <h5>Total a pagar: ${totalAmount.toLocaleString()}</h5>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <Button
        variant={token ? "danger" : "outline-secondary"}
        className="mt-2"
        disabled={!token}
        onClick={handleCheckout}
      >
        {token ? "Pagar" : "Inicie sesión para pagar"}
      </Button>
    </div>
  );
};

export default Cart;
