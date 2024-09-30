import React, { useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { register } = useContext(UserContext);

  const emailRegex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setMessage('Por favor, ingrese un email válido que no contenga caracteres no permitidos.');
      return;
    }

    if (!email || !password || !confirmPassword) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    if (password.length < 6) {
      setMessage('El password debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('El password y la confirmación del password deben ser iguales.');
      return;
    }

    try {
      await register(email, password);
      setMessage('Registro exitoso!');
    } catch (error) {
      setMessage('Error en el registro.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      {message && <div className="alert mt-3">{message}</div>}
    </div>
  );
};

export default RegisterPage;
