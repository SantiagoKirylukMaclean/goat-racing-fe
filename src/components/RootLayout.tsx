// src/components/RootLayout.tsx
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado
import Header from './Header';
import Home from './Home';
import './RootLayout.css'; // Asegúrate de tener un archivo CSS para estilos adicionales

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header isScrolled={isScrolled} />
      <main className={isScrolled ? 'scrolled' : ''}>
      <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta para mostrar el logo */}
          {/* Agrega otras rutas aquí para el contenido adicional */}
        </Routes>
        {children}
      </main>
    </>
  );
};

export default RootLayout;
