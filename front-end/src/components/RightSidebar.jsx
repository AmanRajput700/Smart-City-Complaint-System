import React from 'react';

function RightSidebar() {
  return (
    // The <aside> element is now a vertical flex column
    <aside className="hidden lg:block w-full lg:w-80 flex-shrink-0 flex flex-col">
      
      {/* 1. The Floating Module for "Top Complaint" */}
      <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700 shadow-lg h-[20rem]">
        <h3 className="font-bold text-lg mb-3">Top Complaint</h3>
        <div className="text-sm">
          <p className="font-semibold text-white">Broken Streetlight on Main St</p>
          <p className="text-zinc-400">125 Upvotes</p>
        </div>
        {/* You can add more widgets inside this top section later */}
      </div>

      {/* 2. This is an invisible spacer that pushes the footer down */}
      <div className="flex-grow"></div>

      {/* 3. The Footer, now outside the floating module */}
      <footer className="text-xs text-zinc-500 p-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-2">
          <a href="#" className="hover:underline">User Agreement</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
        </div>
        <p>SCCS, Inc. © 2025. All rights reserved.</p>
      </footer>
    </aside>
  );
}

export default RightSidebar;