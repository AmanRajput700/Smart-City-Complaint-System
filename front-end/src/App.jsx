import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    // This creates a vertical layout locked to the screen height
    <div className="bg-black text-white h-screen flex flex-col">
      <Header />
      
      {/* This container will grow to fill the remaining space and hide any overflow */}
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default App;