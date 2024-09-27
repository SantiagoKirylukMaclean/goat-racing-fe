// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NosotrosPage from './pages/Nosotros/Page';
import EllosPage from './pages/Ellos/Page';
import LoginPage from './pages/Login/Page';
import RootLayout from './components/RootLayout';

const App: React.FC = () => {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/ellos" element={<EllosPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </RootLayout>
    </Router>
  );
};

export default App;
