import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // This function will run once when the app starts
    const checkLoggedIn = async () => {
      try {
        // Make a request to a protected endpoint to get the current user's data
        const response = await axios.get('http://localhost:8080/api/users/profile', {
          withCredentials: true, // This is crucial to send the cookie
        });
        // If the request is successful, the user is logged in
        setUser(response.data);
      } catch (err) {
        // If the request fails (e.g., 401 Unauthorized), the user is not logged in
        console.log('User is not authenticated');
        setUser(null);
      } finally {
        // Set loading to false after the check is complete
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []); // The empty array ensures this effect runs only once

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // While checking, we can show a loading spinner or nothing
  if (loading) {
    return <div className="bg-black h-screen"></div>; // Or a proper loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};