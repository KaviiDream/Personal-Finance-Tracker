import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-600 text-white'
        : 'text-slate-200 hover:bg-primary-700/60'
    }`;

  return (
    <aside className="hidden md:flex md:w-64 bg-slate-900 text-slate-100 flex-col p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💸</span>
        <div>
          <h1 className="text-lg font-semibold">Finance Tracker</h1>
          
        </div>
      </div>

      <nav className="space-y-2">
        <NavLink to="/" end className={linkClass}>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/transactions" className={linkClass}>
          <span>Transactions</span>
        </NavLink>
        <NavLink to="/categories" className={linkClass}>
          <span>Categories</span>
        </NavLink>
        <NavLink to="/goals" className={linkClass}>
          <span>Goals</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
