import React from 'react';
import './Home.css'; // Para estilos específicos del logo
import logo from '../assets/GOAT_LOGO.png'; // Ajusta la ruta según donde hayas guardado la imagen

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="GOAT Logo" className="home-logo" />
    </div>
  );
};

export default Home;
