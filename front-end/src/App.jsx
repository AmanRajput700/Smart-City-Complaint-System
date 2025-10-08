import React from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import ComplaintCard from './components/ComplaintCard';

function App() {
  return (
    // The main container, locked to the screen height
    <div className="bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header />

      {/* This NEW outer div will handle filling the remaining vertical space */}
      <div className="w-full flex-grow overflow-hidden">

        {/* This inner div handles the padding and the 3-column flexbox layout */}
        <div className="max-w-screen-2xl mx-auto h-full p-8 flex flex-row gap-8">

          <LeftSidebar />

          <main className="flex-grow overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Added extra cards to guarantee scrolling */}
            <ComplaintCard />
            <ComplaintCard />
            <ComplaintCard />
            <ComplaintCard />
            <ComplaintCard />
          </main>

          <RightSidebar />
          
        </div>
      </div>
    </div>
  );
}

export default App;