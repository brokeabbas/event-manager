import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Events from '../pages/Events';
import Users from '../pages/Users';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/events" element={<Events />} />
    <Route path="/users" element={<Users />} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

export default AppRoutes;
