// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data.user);
      } catch (err) {
        // Not logged in or session expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      setUser(response.data.user);
      navigate('/account'); // Redirect after successful login
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.post('/users/register', { username, email, password });
      setUser(response.data.user);
      navigate('/account'); // Redirect after successful registration
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/users/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await api.patch('/users/me', updatedData);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed'
      };
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        loading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};