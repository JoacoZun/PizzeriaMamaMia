import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);  
  const [pizzaDetails, setPizzaDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${pizza.id}`);
      const data = await response.json();
      setPizzaDetails(data);
    } catch (error) {
      console.error("Error al cargar los detalles de la pizza:", error);
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <Card style={{ width: "25rem" }}>
        <Card.Img variant="top" src={pizza.img} />
        <Card.Body>
          <Card.Title>Pizza {pizza.name}</Card.Title>
          <hr />
          <strong>Ingredientes:</strong>
          <ul>
            {pizza.ingredients.map((ingredient, index) => (
              <li key={index}>🍕 {ingredient}</li>
            ))}
          </ul>
          <hr />
          <div className="card-price">Precio: ${pizza.price.toLocaleString()}</div>
          <Button onClick={() => addToCart(pizza)} className="ms-2 add-to-cart">
            Añadir 🛒
          </Button>
          <Button onClick={handleShow} className="ms-2" variant="info">
            Ver Pizza 🍕
          </Button>
        </Card.Body>
      </Card>


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pizza {pizzaDetails?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div>Loading...</div>
          ) : (
            pizzaDetails && (
              <>
                <img
                  src={pizzaDetails.img}
                  alt={pizzaDetails.name}
                  className="img-fluid rounded mb-3"
                />
                <p>{pizzaDetails.desc}</p>
                <strong>Ingredientes:</strong>
                <ul>
                  {pizzaDetails.ingredients.map((ingredient, index) => (
                    <li key={index}>🍕 {ingredient}</li>
                  ))}
                </ul>
                <hr />
                <h5>Precio: ${pizzaDetails.price.toLocaleString()}</h5>
              </>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="dark" onClick={() => addToCart(pizzaDetails)}>
            Añadir al carrito 🛒
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardPizza;
