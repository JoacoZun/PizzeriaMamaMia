import React, { useState, useEffect } from "react";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
      })
      .catch((error) => console.error("Error fetching pizzas:", error));
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-wrap justify-content-center">
        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <div key={pizza.id} className="card-container">
              <CardPizza pizza={pizza} />
            </div>
          ))
        ) : (
          <p>No se encontraron pizzas</p>
        )}
      </div>
    </>
  );
};

export default Home;
