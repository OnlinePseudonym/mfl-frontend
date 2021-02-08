import React, { useState } from 'react';

const BASE_API_URL = 'https://localhost:44341/api/users';
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const login = (username, password) => {
    return fetch(`${BASE_API_URL}/authenticate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.isAuthenticated) {
          localStorage.setItem('user', res.token);
          setUser(res.token);
        } else {
          setError(res.status);
        }
      });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('league');
    setUser(null);
  };

  const validate = (token) => {
    return fetch(`${BASE_API_URL}/validate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          localStorage.setItem('user', token);
          setUser(token);
        } else {
          logout();
        }
      });
  };

  const getCurrentUser = () => {
    return localStorage.getItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ user, error, login, logout, validate, getCurrentUser }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
