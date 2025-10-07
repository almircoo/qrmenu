import React, { createContext, useState, useContext, useEffect} from 'react'
import {signIn as signInApi, register as registerApi, getCurrentUser as getCurrentUserApi} from '../apis';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); 

  // fetch the user profile
  const fetchUser = async (authToken) => {
    if (!authToken) return;
    setLoading(true);
    try {
      const userData = await getCurrentUserApi(authToken);
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // signOut(); 
    } finally {
      setLoading(false);
    }
  }

  // Effect to load user data 
  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token]);

  const signIn = async (username, password, callback) => {
    setLoading(true);
    const response = await signInApi(username, password);
    console.log("response", response);

    if (response && response.auth_token) {
      localStorage.setItem("token", response.auth_token);
      setToken(response.auth_token);

      // Fetch the user profile immediately after successful login
      await fetchUser(authToken); 

      callback();
    }

    setLoading(false);
  }

  const signOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  }

  const register = async (username, password, callback) => {
    setLoading(true);
    const response = await registerApi(username, password);
    if (response && response.id) {
      callback();
    }
    setLoading(false);
  }

  const value = {
    token,
    loading,
    user,
    signIn,
    signOut,
    register,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
export const useAuth=()=>{
  const context = useContext(AuthContext)
  if (!context){
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
export default AuthContext;