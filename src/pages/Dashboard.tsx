import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import KPIBubbleCard from '../components/Dashboard/KPIBubbleCard';
import TimeRangeToggle from '../components/Dashboard/TimeRangeToggle';
import KPIModal from '../components/Dashboard/KPIModal';
import RightSummaryPanel from '../components/Dashboard/RightSummaryPanel';
import {
  CalendarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline';

interface KPI {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
}

const Dashboard: React.FC = () => {
  const [range, setRange] = useState('Week');
  const [modalLabel, setModalLabel] = useState<string | null>(null);

  const kpis: KPI[] = [
    {
      label: 'Total Events',
      value: 120,
      icon: <CalendarIcon className="w-6 h-6" />,
      gradient: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    },
    {
      label: 'Upcoming Events',
      value: 45,
      icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
      gradient: 'bg-gradient-to-r from-yellow-500 to-orange-400',
    },
    {
      label: 'Total Attendees',
      value: 1340,
      icon: <UsersIcon className="w-6 h-6" />,
      gradient: 'bg-gradient-to-r from-green-400 to-emerald-600',
    },
    {
      label: 'Avg Attendance',
      value: '42%',
      icon: <PresentationChartBarIcon className="w-6 h-6" />,
      gradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
    },
  ];

  const upcomingEvents = [
    { title: 'Tech Conference', date: '2025-07-10', location: 'NYC' },
    { title: 'Startup Meetup', date: '2025-08-15', location: 'SF' },
  ];

  const pastEvents = [
    { title: 'AI Summit', date: '2025-05-20', location: 'LA' },
    { title: 'DevOps Days', date: '2025-04-18', location: 'Chicago' },
  ];

  const attendanceData = [
    { date: '2025-01', attendees: 200 },
    { date: '2025-02', attendees: 300 },
    { date: '2025-03', attendees: 250 },
    { date: '2025-04', attendees: 400 },
    { date: '2025-05', attendees: 350 },
  ];

  return (
<div className="pt-20 ml-64 px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Time Range Toggle */}
          <TimeRangeToggle selected={range} onChange={setRange} />

          {/* KPI Bubbles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi) => (
              <KPIBubbleCard
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                icon={kpi.icon}
                gradient={kpi.gradient}
                onClick={() => setModalLabel(kpi.label)}
              />
            ))}
          </div>

          {/* Event Panels */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Upcoming Events */}
  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
      <CalendarIcon className="w-5 h-5 text-green-600" />
      Upcoming Events
    </h3>
    <ul className="space-y-4">
      {upcomingEvents.map((event, index) => (
        <li
          key={index}
          className="bg-green-50 hover:bg-green-100 rounded-xl px-4 py-3 transition flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-green-800">{event.title}</p>
            <p className="text-xs text-green-600">
              {event.date} • {event.location}
            </p>
          </div>
          <div className="text-green-500 text-sm font-semibold">📅</div>
        </li>
      ))}
    </ul>
  </div>

  {/* Past Events */}
  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
      <CalendarIcon className="w-5 h-5 text-gray-500" />
      Past Events
    </h3>
    <ul className="space-y-4">
      {pastEvents.map((event, index) => (
        <li
          key={index}
          className="bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-3 transition flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-gray-800">{event.title}</p>
            <p className="text-xs text-gray-500">
              {event.date} • {event.location}
            </p>
          </div>
          <div className="text-gray-500 text-sm font-semibold">✅</div>
        </li>
      ))}
    </ul>
  </div>
</div>


          {/* Attendance Chart */}
          <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-4">Attendance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="attendees" stroke="#6366f1" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Summary Panel */}
        <RightSummaryPanel />
      </div>

      {/* Modal for KPI Details */}
      {modalLabel && (
        <KPIModal title={modalLabel} onClose={() => setModalLabel(null)}>
          <p className="text-gray-600">
            Showing advanced breakdown of <strong>{modalLabel}</strong> in <strong>{range}</strong> view.
          </p>
        </KPIModal>
      )}
    </div>
  );
};

export default Dashboard;
