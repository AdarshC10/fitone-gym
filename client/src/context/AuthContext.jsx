import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('fitone_token');
      if (token) {
        try {
          const res = await API.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.data);
          }
        } catch (err) {
          console.error('Failed to load user auth:', err);
          localStorage.removeItem('fitone_token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.success) {
      const userData = res.data.data;
      localStorage.setItem('fitone_token', userData.token);
      setUser(userData);
      return userData;
    }
  };

  const register = async (formData) => {
    const res = await API.post('/auth/register', formData);
    if (res.data.success) {
      const userData = res.data.data;
      localStorage.setItem('fitone_token', userData.token);
      setUser(userData);
      return userData;
    }
  };

  const logout = () => {
    localStorage.removeItem('fitone_token');
    setUser(null);
  };

  const updateUserProfile = async (id, updatedData) => {
    const res = await API.put(`/users/${id}`, updatedData);
    if (res.data.success) {
      setUser((prev) => ({ ...prev, ...res.data.data }));
      return res.data.data;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
