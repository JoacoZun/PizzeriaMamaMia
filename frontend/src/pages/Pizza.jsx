import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Pizza = () => {
  const { id } = useParams(); 
  const { addToCart } = useCart();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pizza data");
        }
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pizza) {
    return <div>Error: Pizza not found.</div>;
  }

  return (
    <div className="container mt-5 p-2 bg-light border">
      <div className="row">
        <div className="col-md-6">
          <img src={pizza.img} alt={pizza.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="text-capitalize">{pizza.name}</h2>
          <p>{pizza.desc}</p>
          <ul className="list-unstyled">
            {pizza.ingredients.map((ingredient, index) => (
              <li key={index}>🍕 {ingredient}</li>
            ))}
          </ul>
          <div className="d-flex align-items-center mt-3">
            <h4 className="mb-0">Precio: ${pizza.price.toLocaleString()}</h4>
            <button className="btn btn-dark ms-3" onClick={() => addToCart(pizza)}>
              Añadir 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
