import React from 'react';

function RightSidebar() {
  return (
    <aside className="hidden lg:block w-full lg:w-80 flex-shrink-0">
      <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700 shadow-lg h-[25rem]">
        <h3 className="font-bold text-lg mb-3">Top Complaint</h3>
        <div className="text-sm">
          <p className="font-semibold text-white">Broken Streetlight on Main St</p>
          <p className="text-zinc-400">125 Upvotes</p>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;