import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0">
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/users" className="hover:bg-gray-700 p-2 block rounded">Users</Link>
            </li>
            <li className="mb-2">
              <Link to="/recruiters" className="hover:bg-gray-700 p-2 block rounded">Recruiters</Link>
            </li>
            <li className="mb-2">
              <Link to="/jobs" className="hover:bg-gray-700 p-2 block rounded">Jobs</Link>
            </li>
            <li className="mb-2">
              <Link to="/applications" className="hover:bg-gray-700 p-2 block rounded">Applications</Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
