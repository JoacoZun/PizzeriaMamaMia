import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Mamma Mía! la página que estás buscando no existe!</h1>
      <p> 404 - Página no encontrada</p>
      <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
    </div>
  );
};

export default NotFound;
