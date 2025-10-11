import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ComplaintPost from '../components/ComplaintPost'; // A dedicated component for the main post
import Comment from '../components/Comment';             // A component for a single comment
import CommentForm from '../components/CommentForm';   // The form for adding new comments

/**
 * A page that displays the full details of a single complaint,
 * including a form to add comments and a list of existing comments.
 */
function ComplaintDetailPage() {
  // --- State Management ---
  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); // Get the complaint ID from the URL

  // --- Data Fetching ---
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch both the main complaint and its comments in parallel for efficiency
        const [complaintRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/complaints/${id}`, { withCredentials: true }),
          axios.get(`http://localhost:8080/api/complaints/${id}/comments`, { withCredentials: true })
        ]);

        setComplaint(complaintRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        setError('Could not load complaint details. Please try again.');
        console.error("Failed to fetch complaint details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]); // This effect re-runs if the complaint ID in the URL changes

  // --- Event Handlers ---
  const handleCommentSubmit = useCallback(async (commentText) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/complaints/${id}/comments`,
        { text: commentText },
        { withCredentials: true }
      );
      
      // Optimistic UI Update: Add the new comment to the list instantly.
      setComments(prevComments => [response.data, ...prevComments]);
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Could not post your comment. Please try again.");
    }
  }, [id]); // useCallback ensures this function is stable

  // --- Conditional Rendering ---
  if (loading) {
    return <p className="p-8 text-center text-zinc-400">Loading...</p>;
  }

  if (error) {
    return <p className="p-8 text-center text-red-500">{error}</p>;
  }

  if (!complaint) {
    return <p className="p-8 text-center">Complaint not found.</p>;
  }

  // --- Main Render ---
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* 1. The Main Complaint Post */}
      <ComplaintPost complaint={complaint} />

      {/* 2. The Form to Add a New Comment */}
      <div className="my-8">
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>

      {/* 3. The List of Existing Comments */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h3>
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default ComplaintDetailPage;