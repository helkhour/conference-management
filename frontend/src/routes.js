import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConferencesPage from './pages/ConferencesPage';
import DoctorsPage from './pages/DoctorsPage';
import CostsPage from './pages/CostsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/conferences" element={<ConferencesPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/costs" element={<CostsPage />} />
    </Routes>
  );
}

export default AppRoutes;