import React, { useState, useEffect, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { userEmail, logout, getProfile } = useContext(UserContext);
  const [profileEmail, setProfileEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await getProfile(); 
        setProfileEmail(userEmail); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userEmail, getProfile]);

  return (
    <Container className="mt-5">
      <h2>Perfil</h2>
      <p>Email: {profileEmail}</p>
      <Button onClick={logout} variant="danger">Cerrar Sesión</Button>
    </Container>
  );
};

export default Profile;
