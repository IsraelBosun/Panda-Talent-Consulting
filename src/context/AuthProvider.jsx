// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // FIX: Imported for redirection
// import { 
//   auth, 
//   db,
//   app, // FIX: Imported 'app' for Callable Functions
// } from '../../config/firebase-client';
// import { 
//   onAuthStateChanged, 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth';
// // FIX: Imported Firebase Functions methods
// import { getFunctions, httpsCallable } from 'firebase/functions'; 

// import { doc, getDoc } from 'firebase/firestore';
// import { Toaster, toast } from 'react-hot-toast';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }


// // Initialize Callable Functions Client
// const functions = getFunctions(app);
// const finalizeSignupCallable = httpsCallable(functions, 'finalizeSignup');

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter(); // FIX: Initialized useRouter

//   // FIX: Helper function to handle role-based redirection
//   const redirectToDashboard = (role) => {
//     switch (role) {
//       case 'candidate':
//         router.push('/candidate/dashboard');
//         break;
//       case 'employer':
//         router.push('/employer/dashboard');
//         break;
//       case 'admin':
//         router.push('/admin/dashboard');
//         break;
//       default:
//         // For 'pending' or unknown roles, send to a profile setup page
//         router.push('/onboarding'); 
//     }
//   };

//   // -------------------------
//   // 1. Core Auth Functions
//   // -------------------------

//   async function signup(email, password, role) {
//     try {
//       // 1. Create user with email/password
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
      
//       // 2. Call the backend function to set the custom role and create profile
//       await finalizeSignupCallable({ role });

//       // 3. Force token refresh to get the new custom claim immediately
//       const tokenResult = await user.getIdTokenResult(true); 
//       const finalRole = tokenResult.claims.role || role;
      
//       toast.success('Account created successfully! Redirecting...');
//       redirectToDashboard(finalRole);
      
//       return userCredential;

//     } catch (error) {
//       console.error(error);
//       const errorMessage = error.message.includes('auth/') ? error.message : "Signup failed. Please try again.";
//       toast.error(errorMessage);
//       throw error;
//     }
//   }

//   async function login(email, password) { // FIX: Added redirection after login
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
        
//         // Fetch current claims to get the role
//         const tokenResult = await user.getIdTokenResult();
//         const role = tokenResult.claims.role || 'pending';
        
//         toast.success('Logged in successfully! Redirecting...');
//         redirectToDashboard(role);
        
//         return userCredential;
//     } catch (error) {
//         toast.error(error.message);
//         throw error;
//     }
//   }

//   function logout() {
//     return signOut(auth);
//   }

//   // -------------------------
//   // 2. User State Management
//   // -------------------------
  
//   useEffect(() => {
//     // ... (rest of the useEffect remains the same as it correctly handles token change)
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // Fetch custom claims to get the user's role (candidate, employer, admin)
//         const tokenResult = await user.getIdTokenResult();
//         const role = tokenResult.claims.role || 'pending';

//         // Fetch user data from Firestore for additional details
//         const userRef = doc(db, 'users', user.uid);
//         const userDoc = await getDoc(userRef);
        
//         const userData = userDoc.exists() ? userDoc.data() : {};

//         setCurrentUser({
//           ...user,
//           role, // 'candidate', 'employer', or 'admin'
//           firestoreData: userData,
//         });
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     loading
//     // We will add the Google SSO function here later
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       <Toaster position="top-right" />
//       {!loading && children}
//       {/* Optionally show a loading spinner if loading */}
//       {loading && (
//         <div className="flex items-center justify-center h-screen text-lg">
//             Loading Application...
//         </div>
//       )}
//     </AuthContext.Provider>
//   );
// }




'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, app } from '../../config/firebase-client';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { doc, getDoc } from 'firebase/firestore';
import { Toaster, toast } from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Initialize Callable Functions Client
const functions = getFunctions(app);
const finalizeSignupCallable = httpsCallable(functions, 'finalizeSignup');

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Role-based redirection helper
  const redirectToDashboard = (role) => {
    switch (role) {
      case 'candidate':
        router.push('/candidate/dashboard');
        break;
      case 'employer':
        router.push('/employer/dashboard');
        break;
      case 'admin':
        router.push('/admin/dashboard');
        break;
      default:
        router.push('/onboarding'); // pending or unknown roles
    }
  };

  // -------------------------
  // Auth functions
  // -------------------------
  async function signup(email, password, role) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await finalizeSignupCallable({ role });

      const tokenResult = await user.getIdTokenResult(true);
      const finalRole = tokenResult.claims.role || role;

      toast.success('Account created successfully! Redirecting...');
      redirectToDashboard(finalRole);

      return userCredential;
    } catch (error) {
      console.error(error);
      const errorMessage = error.message.includes('auth/') ? error.message : "Signup failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const tokenResult = await user.getIdTokenResult();
      const role = tokenResult.claims.role || 'pending';

      toast.success('Logged in successfully! Redirecting...');
      redirectToDashboard(role);

      return userCredential;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  // -------------------------
  // User state management
  // -------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          const role = tokenResult.claims.role || 'pending';

          // Fetch Firestore data safely
          let userData = {};
          try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) userData = userDoc.data();
          } catch (err) {
            console.warn("Failed to fetch user data:", err);
          }

          setCurrentUser({ ...user, role, firestoreData: userData });
        } catch (err) {
          console.error("Error reading auth token:", err);
          setCurrentUser({ ...user, role: 'pending', firestoreData: {} });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false); // Done with initial auth check
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      <Toaster position="top-right" />
      {/* Render children immediately; optionally show a global spinner elsewhere */}
      {children}
    </AuthContext.Provider>
  );
}
