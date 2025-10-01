import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/Events';
import CreateEventPage from './pages/events/Create';
import EventManagementPage from './pages/events/Manage';
import EditEventPage from './pages/events/Edit';
import HostsDashboard from './pages/Hosts'; // ✅ New import

const App: React.FC = () => (
  <div className="flex bg-[#F5F7FB] min-h-screen">
    <Sidebar />
    <div className="flex-1 p-6">
      <TopBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/create" element={<CreateEventPage />} />
        <Route path="/events/manage" element={<EventManagementPage />} />
        <Route path="/events/edit/:id" element={<EditEventPage />} />
        <Route path="/hosts" element={<HostsDashboard />} /> {/* ✅ New route */}
      </Routes>
    </div>
  </div>
);

export default App;
