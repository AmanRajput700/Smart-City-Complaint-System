import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp, FaRegCommentAlt, FaShare } from 'react-icons/fa';

function ComplaintCard({ complaint }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [voteCount, setVoteCount] = useState(complaint.upvoteCount || 0);
  const [hasUpvoted, setHasUpvoted] = useState(user ? complaint.upvotes.includes(user._id) : false);

  // This function will navigate when the main card area is clicked
  const handleCardClick = () => {
    navigate(`/complaint/${complaint._id}`);
  };

  const handleUpvoteToggle = useCallback(async (event) => {
    // CRUCIAL: Stop the click from triggering handleCardClick
    event.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    const endpoint = `http://localhost:8080/api/complaints/${complaint._id}/upvote`;
    const originalVoteCount = voteCount;
    const originalHasUpvoted = hasUpvoted;

    setHasUpvoted(!originalHasUpvoted);
    setVoteCount(originalHasUpvoted ? originalVoteCount - 1 : originalVoteCount + 1);

    try {
      if (originalHasUpvoted) {
        await axios.delete(endpoint, { withCredentials: true });
      } else {
        await axios.post(endpoint, {}, { withCredentials: true });
      }
    } catch (error) {
      console.error('Failed to toggle upvote:', error);
      setVoteCount(originalVoteCount);
      setHasUpvoted(originalHasUpvoted);
    }
  }, [user, navigate, complaint._id, voteCount, hasUpvoted]);

  const handleCommentsClick = (event) => {
    event.stopPropagation();
    navigate(`/complaint/${complaint._id}`);
  };

  const handleShareClick = useCallback((event) => {
    event.stopPropagation();
    // Share logic here
  }, []);

  return (
    // The main div is now clickable
    <div 
      onClick={handleCardClick} 
      className="bg-zinc-900 border border-zinc-700 rounded-lg mb-6 flex flex-col shadow-lg hover:border-zinc-600 transition-colors duration-200 cursor-pointer"
    >
      <div className="p-4">
        <p className="text-xs text-zinc-400">Posted by 
          <span className="font-semibold text-purple-400 ml-1">
            {complaint.author?.anonymousName || 'Anonymous'}
          </span>
        </p>
        <h3 className="text-xl font-bold mt-1 text-white">{complaint.title}</h3>
      </div>

      {complaint.image && (
        <div className="bg-black w-full flex items-center justify-center border-y border-zinc-700">
          <img 
            src={`http://localhost:8080/${complaint.image.replace(/\\/g, '/')}`} 
            alt={complaint.title || 'Complaint Image'} 
            className="max-h-96 object-contain" 
          />
        </div>
      )}
      
      <div className="p-4">
        <p className="text-sm text-zinc-300">{complaint.description}</p>
      </div>

      <div className="flex items-center justify-between px-4 pb-2 text-sm font-bold text-zinc-400">
        <div className="flex items-center bg-zinc-800 p-1 rounded-full">
          {/* This button's click will be stopped */}
          <button onClick={handleUpvoteToggle} className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-700 px-2 transition-colors">
            <FaArrowUp className={`w-4 h-4 transition-colors ${hasUpvoted ? 'text-green-500' : 'text-zinc-400'}`} />
            <span className="text-white">{voteCount}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={handleCommentsClick} className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-700 transition-colors">
            <FaRegCommentAlt className="w-4 h-4" />
            <span>{complaint.comments?.length || 0} Comments</span>
          </button>
          <button onClick={handleShareClick} className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-700 transition-colors">
            <FaShare className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintCard;