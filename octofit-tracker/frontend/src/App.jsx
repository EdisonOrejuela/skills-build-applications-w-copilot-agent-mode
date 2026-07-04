import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
        <p className="lead text-muted">
          Build a modern fitness experience with React 19, Vite, and a connected Node.js API.
        </p>
        <div className="alert alert-info mt-3">
          Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces URLs. Without it, the app falls back to localhost.
        </div>
        <nav className="nav flex-wrap gap-2 mt-3">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

function Overview() {
  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h4">Welcome to your fitness app shell</h2>
            <p className="text-muted mb-0">
              Use the navigation above to inspect users, teams, activities, leaderboard entries, and workout ideas from the backend API.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h4">API connection</h2>
            <ul className="mb-0">
              <li>Codespaces URLs use <code>https://{import.meta.env.VITE_CODESPACE_NAME || 'your-codespace-name'}-8000.app.github.dev/api/[component]/</code></li>
              <li>Local development falls back to <code>http://localhost:8000/api/[component]</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
