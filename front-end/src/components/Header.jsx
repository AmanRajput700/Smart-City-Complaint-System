import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Tell the backend to clear the cookie
      await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
      
      // 2. Clear user data from frontend state
      logout();
      
      // 3. Redirect to the login page
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the server fails, log them out on the frontend
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="bg-zinc-900 p-4 border-b border-zinc-700 sticky top-0 z-10">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center gap-8">
        <Link to="/" className="text-2xl font-bold flex-shrink-0">SCCS</Link>

        <div className="relative flex-grow max-w-xl">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <FaSearch className="text-zinc-500" />
          </span>
          <input
            type="text"
            placeholder="Search complaints..."
            className="bg-zinc-800 border border-zinc-700 rounded-lg w-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          {user ? (
            // If user is logged in, show their name and a Logout button
            <div className="flex items-center gap-4">
              <span className="font-semibold">{user.anonymousName || user.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex-shrink-0"
              >
                Logout
              </button>
            </div>
          ) : (
            // If user is not logged in, show the Login button
            <button 
              onClick={() => navigate('/login')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex-shrink-0"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;