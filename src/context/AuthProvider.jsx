'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db,
  // You will add the GoogleAuthProvider here later
} from '../../config/firebase-client';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  // You will add signInWithPopup and GoogleAuthProvider here later
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Toaster, toast } from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // 1. Core Auth Functions
  // -------------------------

  async function signup(email, password, role) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // IMPORTANT: Add custom claim for role immediately upon signup
      // This requires a Cloud Function (next step) to set the custom claim,
      // but for now, we'll return the user.
      
      // We will also need to call a backend API here to create the 
      // Firestore document and set the custom claim.
      
      return userCredential;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  // -------------------------
  // 2. User State Management
  // -------------------------
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch custom claims to get the user's role (candidate, employer, admin)
        const tokenResult = await user.getIdTokenResult();
        const role = tokenResult.claims.role || 'pending';

        // Fetch user data from Firestore for additional details
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        const userData = userDoc.exists() ? userDoc.data() : {};

        setCurrentUser({
          ...user,
          role, // 'candidate', 'employer', or 'admin'
          firestoreData: userData,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
    // We will add the Google SSO function here later
  };

  return (
    <AuthContext.Provider value={value}>
      <Toaster position="top-right" />
      {!loading && children}
      {/* Optionally show a loading spinner if loading */}
      {loading && (
        <div className="flex items-center justify-center h-screen text-lg">
            Loading Application...
        </div>
      )}
    </AuthContext.Provider>
  );
}