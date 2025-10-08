import React from 'react';

function Header() {
  return (
    <header className="bg-zinc-900 p-4 border-b border-zinc-700 sticky top-0 z-10">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">SCCS</h1>
        <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
          Log In
        </button>
      </div>
    </header>
  );
}

export default Header;