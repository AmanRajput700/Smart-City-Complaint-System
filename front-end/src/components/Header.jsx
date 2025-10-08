import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function Header() {
  return (
    <header className="bg-zinc-900 p-4 border-b border-zinc-700 sticky top-0 z-10">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center gap-8">
        
        {/* Left Side: Title */}
        <h1 className="text-2xl font-bold flex-shrink-0">SCCS</h1>

        {/* Center: Search Bar */}
        <div className="relative flex-grow max-w-xl">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <FaSearch className="text-zinc-500" />
          </span>
          <input
            type="text"
            placeholder="Search complaints..."
            className="bg-zinc-800 border border-zinc-700 rounded-lg w-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Right Side: Login Button */}
        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg flex-shrink-0">
          Log In
        </button>
        
      </div>
    </header>
  );
}

export default Header;