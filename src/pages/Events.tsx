import React from 'react';
import {
  CalendarIcon,
  PlusIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ClockIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Mock Data
const mockEvents = [
  { title: 'Tech Conference 2025', date: '2025-07-10', location: 'New York', ticketsSold: 150, revenue: 7500 },
  { title: 'Startup Meetup', date: '2025-08-15', location: 'San Francisco', ticketsSold: 120, revenue: 6000 },
  { title: 'AI Summit', date: '2025-09-05', location: 'Los Angeles', ticketsSold: 200, revenue: 10000 },
];

const revenueData = [
  { day: 'Mon', revenue: 2000 },
  { day: 'Tue', revenue: 3000 },
  { day: 'Wed', revenue: 3500 },
  { day: 'Thu', revenue: 6400 },
  { day: 'Fri', revenue: 4000 },
  { day: 'Sat', revenue: 7000 },
  { day: 'Sun', revenue: 8500 },
];

const ticketData = [
  { day: 'Mon', sold: 20, available: 10 },
  { day: 'Tue', sold: 30, available: 15 },
  { day: 'Wed', sold: 25, available: 12 },
  { day: 'Thu', sold: 50, available: 20 },
  { day: 'Fri', sold: 35, available: 18 },
  { day: 'Sat', sold: 60, available: 30 },
  { day: 'Sun', sold: 80, available: 35 },
];

const tooltipStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  border: '1px solid #eee',
  padding: '8px',
  fontSize: '0.8rem',
};

// Main Component
const EventsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 ml-64 px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-green-600" />
            Events Dashboard
          </h1>
          <button
            onClick={() => navigate('/events/create')}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full shadow-lg transition-all"
          >
            <PlusIcon className="w-5 h-5" />
            Create Event
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MetricCard
            icon={<ChartBarIcon className="w-10 h-10" />}
            label="Total Events"
            value={mockEvents.length}
            gradient="from-indigo-500 via-purple-500 to-pink-500"
          />
          <MetricCard
            icon={<ClipboardDocumentListIcon className="w-10 h-10" />}
            label="Total Tickets Sold"
            value={mockEvents.reduce((acc, e) => acc + e.ticketsSold, 0)}
            gradient="from-yellow-400 via-orange-500 to-red-500"
          />
          <MetricCard
            icon={<ChartBarIcon className="w-10 h-10" />}
            label="Total Revenue"
            value={`$${mockEvents.reduce((acc, e) => acc + e.revenue, 0).toLocaleString()}`}
            gradient="from-green-400 via-emerald-500 to-teal-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="📈 Revenue">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="🎟️ Ticket Sales" actionText="Manage Tickets">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ticketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="sold" fill="#6366F1" barSize={24} radius={[5, 5, 0, 0]} />
                <Bar dataKey="available" fill="#F59E0B" barSize={24} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Event Management */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">🎯 Events Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard
              icon={<Cog6ToothIcon className="w-12 h-12" />}
              title="Manage Events"
              description="View, edit or delete existing events from your system dashboard."
              gradient="from-green-400 via-green-500 to-emerald-500"
              onClick={() => navigate('/events/manage')}
            />

            <ActionCard
              icon={<PlusCircleIcon className="w-12 h-12" />}
              title="Schedule Event"
              description="Quickly create and publish a new event with ease."
              gradient="from-indigo-400 via-blue-500 to-indigo-600"
            />
            <ActionCard
              icon={<ClockIcon className="w-12 h-12" />}
              title="Event History"
              description="Browse previously held events and analyze attendance and stats."
              gradient="from-gray-400 via-gray-500 to-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Calendar + Upcoming Events */}
      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <Calendar
          className="w-full rounded-xl border-none transition-all duration-300 hover:scale-[1.01]"
          tileContent={({ date, view }) => {
            if (view !== 'month') return null;
            const today = new Date();
            const sameDay = (a: Date, b: Date) =>
              a.getFullYear() === b.getFullYear() &&
              a.getMonth() === b.getMonth() &&
              a.getDate() === b.getDate();
            const event = mockEvents.find(ev => sameDay(new Date(ev.date), date));
            if (!event) return null;

            const isToday = sameDay(today, date);
            const isPast = date < today && !isToday;
            const isFuture = date > today;
            let dotColor = isToday ? 'bg-red-500' : isFuture ? 'bg-green-500' : 'bg-gray-400';

            return (
              <div className="flex justify-center items-center mt-1">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
              </div>
            );
          }}
        />

        <div>
          <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
          <ul className="space-y-3 text-sm">
            {mockEvents.map((e, i) => (
              <li key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{e.title}</p>
                  <p className="text-gray-500">{e.location} • {new Date(e.date).toLocaleDateString()}</p>
                </div>
                <span className="flex -space-x-2">
                  {[...Array(4)].map((_, j) => (
                    <img
                      key={j}
                      src={`https://i.pravatar.cc/30?img=${j + 5}`}
                      alt="avatar"
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Component Helpers
const MetricCard = ({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient: string;
}) => (
  <div className={`bg-gradient-to-tr ${gradient} rounded-2xl p-5 shadow-xl text-white transform transition duration-300 hover:scale-[1.02] relative overflow-hidden`}>
    <div className="absolute top-3 right-3 opacity-20">{icon}</div>
    <div className="relative z-10">
      <p className="text-sm font-medium tracking-wide opacity-90">{label}</p>
      <h3 className="text-2xl font-bold leading-snug mt-1">{value}</h3>
    </div>
  </div>
);

const ActionCard = ({
  icon,
  title,
  description,
  gradient,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`bg-gradient-to-tr ${gradient} text-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transform transition-all hover:scale-[1.03] cursor-pointer relative overflow-hidden`}
  >
    <div className="absolute top-4 right-4 opacity-20">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-white/90">{description}</p>
  </div>
);


const ChartCard = ({
  title,
  children,
  actionText,
}: {
  title: string;
  children: React.ReactNode;
  actionText?: string;
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl transition hover:shadow-2xl">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-sm text-gray-600 font-semibold">{title}</h2>
      {actionText && (
        <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-full shadow">
          {actionText}
        </button>
      )}
    </div>
    {children}
  </div>
);

export default EventsPage;
