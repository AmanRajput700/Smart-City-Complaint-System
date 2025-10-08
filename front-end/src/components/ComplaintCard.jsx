import React from 'react';
import { FaArrowUp, FaArrowDown, FaRegCommentAlt, FaShare } from 'react-icons/fa';

function ComplaintCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg mb-6 flex flex-col shadow-lg">
      {/* Card Header */}
      <div className="p-4">
        <p className="text-xs text-zinc-400">Posted by 
          <span className="font-semibold text-gray-200 ml-1">Brave Lion</span>
        </p>
        <h3 className="text-xl font-bold mt-1 text-white">Example Complaint Title: Pothole on 2nd Street</h3>
      </div>

      {/* Complaint Image (Placeholder) */}
      <div className="bg-black w-full h-72 flex items-center justify-center border-y border-zinc-700">
        <p className="text-zinc-500">Complaint Image Here</p>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <p className="text-sm text-zinc-300">
          This is the description of the complaint...
        </p>
      </div>

      {/* Redesigned Action Bar with justify-between */}
      <div className="flex items-center justify-between px-4 pb-2 text-sm font-bold text-zinc-400">
        
        {/* Vote button group (this stays on the left) */}
        <div className="flex items-center bg-zinc-800 p-1 rounded-full">
          <button className="flex items-center gap-1 p-1 rounded-full hover:bg-zinc-700">
            <FaArrowUp className="w-4 h-4" />
          </button>
          <span className="px-2 text-white">3.8k</span>
          <button className="flex items-center gap-1 p-1 rounded-full hover:bg-zinc-700">
            <FaArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* NEW: Group for right-side buttons */}
        <div className="flex items-center gap-4">
          {/* Comments button */}
          <button className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-700">
            <FaRegCommentAlt className="w-4 h-4" />
            <span>3.7k Comments</span>
          </button>

          {/* Share button */}
          <button className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-700">
            <FaShare className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintCard;