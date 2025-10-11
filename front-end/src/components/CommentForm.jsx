import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function CommentForm({ onSubmit }) {
  const [text, setText] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Don't submit empty comments
    onSubmit(text);
    setText(''); // Clear the textarea after submitting
  };

  if (!user) {
    return (
      <div className="bg-zinc-800 p-4 rounded-lg text-center text-zinc-400">
        You must be logged in to comment.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        rows="3"
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
      <button 
        type="submit" 
        className="self-end bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50"
        disabled={!text.trim()}
      >
        Comment
      </button>
    </form>
  );
}

export default CommentForm;