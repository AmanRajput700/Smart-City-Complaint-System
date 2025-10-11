import React from 'react';
import { Link } from 'react-router-dom';

function LeftSidebar() {
  return (
    <aside className="hidden md:block w-full md:w-56 flex-shrink-0">
      <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700 shadow-lg">
        <nav className="space-y-2">
          <a href="#" className="flex items-center p-3 font-semibold text-white rounded-lg bg-gray-600">Home</a>
          <Link to="/lodge-complaint" className="flex items-center p-3 rounded-lg text-zinc-300 hover:bg-zinc-700 hover:text-white">Lodge Complaint</Link>
          <a href="#" className="flex items-center p-3 rounded-lg text-zinc-300 hover:bg-zinc-700 hover:text-white">My Complaints</a>
          <a href="#" className="flex items-center p-3 rounded-lg text-zinc-300 hover:bg-zinc-700 hover:text-white">Map</a>
        </nav>
      </div>
    </aside>
  );
}

export default LeftSidebar;