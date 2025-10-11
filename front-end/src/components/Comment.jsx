import React from 'react';

function Comment({ comment }) {
  return (
    <div className="flex gap-3">
      {/* Placeholder for a user avatar */}
      <div className="w-10 h-10 rounded-full bg-purple-600 flex-shrink-0"></div>
      <div className="bg-zinc-800 p-3 rounded-lg w-full">
        <p className="font-bold text-sm text-white">{comment.author?.name || 'Anonymous'}</p>
        <p className="text-zinc-300 mt-1">{comment.text}</p>
      </div>
    </div>
  );
}

export default Comment;