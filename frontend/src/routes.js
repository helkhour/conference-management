import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConferencesPage from './pages/ConferencesPage';
import DoctorsPage from './pages/DoctorsPage';
import CostsPage from './pages/CostsPage';
import ConferenceForm from './components/conferences/ConferenceForm';
import DoctorForm from './components/doctors/DoctorForm';
import DoctorDetail from './components/doctors/DoctorDetail';
import ConferenceDetail from './components/conferences/ConferenceDetail';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/conferences" element={<ConferencesPage />} />
      <Route path="/conferences/add" element={<ConferenceForm />} />
      <Route path="/conferences/edit/:id" element={<ConferenceForm />} />
      <Route path="/conferences/view/:id" element={<ConferenceDetail />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/doctors/add" element={<DoctorForm />} />
      <Route path="/doctors/edit/:id" element={<DoctorForm />} />
      <Route path="/doctors/view/:id" element={<DoctorDetail />} />
      <Route path="/costs" element={<CostsPage />} />
    </Routes>
  );
}

export default AppRoutes;