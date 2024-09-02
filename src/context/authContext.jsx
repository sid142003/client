// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Export the useAuth hook for easy context consumption
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component that will wrap around the app components
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  const loginUser = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);
      setCurrentUser({
        ...response.data.user,
        token: response.data.token
      });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error("Login failed:", error.response.data);
      throw error; // Re-throw the error to be caught by the calling component
    }
  };

  // Function to handle user registration
  const registerUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', user);
      setCurrentUser({
        ...response.data.user,
        token: response.data.token
      });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      throw error; // Re-throw the error to be caught by the calling component
    }
  };

  // Function to handle user logout
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  // Attempt to rehydrate user from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/users/me', { // Replace '/me' with your actual route to fetch user
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setCurrentUser({
          ...response.data,
          token: token
        });
      }).catch(error => {
        console.error("Failed to rehydrate user:", error);
      });
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    loginUser,
    registerUser,
    logoutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Optionally export AuthContext if direct access is ever necessary
export { AuthContext };
