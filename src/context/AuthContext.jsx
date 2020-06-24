import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import SpinnerLoad from '../components/SpinnerLoad';

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState({ name: '', phone: '' , adresse: '' , email: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <SpinnerLoad />  
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
