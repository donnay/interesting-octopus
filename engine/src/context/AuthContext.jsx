import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously,
  signOut as fbSignOut 
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google sign in error:", err);
      setAuthError(err.message);
      throw err;
    }
  };

  const loginWithEmail = async (email, password) => {
    setAuthError(null);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Email sign in error:", err);
      setAuthError(err.message);
      throw err;
    }
  };

  const signupWithEmail = async (email, password) => {
    setAuthError(null);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Sign up error:", err);
      setAuthError(err.message);
      throw err;
    }
  };

  const loginAsGuest = async () => {
    setAuthError(null);
    try {
      return await signInAnonymously(auth);
    } catch (err) {
      console.error("Guest login error:", err);
      setAuthError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    setAuthError(null);
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
      setAuthError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      authError,
      loginWithGoogle,
      loginWithEmail,
      signupWithEmail,
      loginAsGuest,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

