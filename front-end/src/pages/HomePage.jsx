import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import ComplaintCard from '../components/ComplaintCard';

function HomePage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:8080/api/complaints');
        // Ensure the response data is an array before setting it
        if (Array.isArray(response.data)) {
          setComplaints(response.data);
        } else {
          setComplaints([]); // Set to empty array if data is not an array
        }
      } catch (err) {
        setError('Failed to fetch complaints. The server might be down.');
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    fetchComplaints();
  }, []);

  // This function renders the main content based on the state
  const renderContent = () => {
    if (loading) {
      return <p className="text-zinc-400">Loading complaints...</p>;
    }
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }
    if (complaints.length === 0) {
      return <p className="text-zinc-400">No complaints found. Be the first to post!</p>;
    }
    return complaints.map((complaint) => (
      <ComplaintCard key={complaint._id} complaint={complaint} />
    ));
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-8 w-full h-full grid lg:grid-cols-[224px_1fr_320px] md:grid-cols-[224px_1fr] gap-8">
      <LeftSidebar />
      <main className="overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {renderContent()}
      </main>
      <RightSidebar />
    </div>
  );
}

export default HomePage;