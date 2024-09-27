// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/GOAT_LOGO_MINI.png'

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  return (
    <header className={isScrolled ? 'header small' : 'header'}>
      <div className="logo">
      <img src={logo} alt="GOAT Logo" className="logo-image" />
      </div>
      <nav>
        <ul>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/ellos">Ellos</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
