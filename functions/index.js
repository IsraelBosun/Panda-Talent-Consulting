// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");

// // For cost control, you can set the maximum number of containers that can be
// // running at the same time. This helps mitigate the impact of unexpected
// // traffic spikes by instead downgrading performance. This limit is a
// // per-function limit. You can override the limit for each function using the
// // `maxInstances` option in the function's options, e.g.
// // `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// // NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// // functions should each use functions.runWith({ maxInstances: 10 }) instead.
// // In the v1 API, each function can only serve one request per container, so
// // this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });








const functions = require('firebase-functions');
const { authAdmin, dbAdmin } = require('./config/firebase-admin'); // Adjust path if needed

// --- Firestore Collection Names (Centralized for consistency) ---
const COLLECTIONS = {
    USERS: 'users',
    CANDIDATES: 'candidates',
    EMPLOYERS: 'employers',
    ADMINS: 'admins'
};


/**
 * Cloud Function triggered when a new user signs up via Firebase Auth.
 * * 1. Reads the temporary 'role' set during frontend signup.
 * 2. Sets the 'role' as a custom claim on the user's Auth token for RBAC.
 * 3. Creates the user's public 'users/{uid}' document in Firestore.
 * 4. Creates a corresponding 'candidate' or 'employer' profile document.
 */
exports.processSignUp = functions.auth.user().onCreate(async (user) => {
    const { uid, email } = user;
    
    // --- 1. Determine Initial Role ---
    
    // Default to 'candidate' if no role is explicitly passed (e.g., if using Google SSO later)
    let initialRole = 'candidate';
    
    // Check if the user's email is designated as the first admin (Manual check needed)
    // NOTE: Replace 'your.admin@email.com' with the email you will use for administration.
    const FIRST_ADMIN_EMAIL = 'your.superadmin@example.com'; 
    if (email === FIRST_ADMIN_EMAIL) {
        initialRole = 'admin';
    } else {
        // You'll need a way to pass the chosen role from the frontend signup form 
        // to this backend function. Since Firebase Auth onCreate trigger doesn't 
        // pass custom signup data directly, the *best practice* is usually 
        // to have the frontend immediately call a separate Callable Function 
        // *after* signup to finalize the profile and set the role.
        
        // For simplicity *now*, we default to 'candidate', assuming most signups are candidates.
        // We will implement the proper Callable Function (finalizeProfile) in the next step.
    }


    // --- 2. Set Custom Claim (Role-Based Access Control) ---
    try {
        await authAdmin.setCustomUserClaims(uid, { role: initialRole });
        console.log(`Custom claim set for user ${uid}: role=${initialRole}`);
    } catch (error) {
        console.error("Error setting custom claims:", error);
        // Do not block execution, continue to Firestore setup
    }


    // --- 3. Create 'users' Document ---
    const userRef = dbAdmin.collection(COLLECTIONS.USERS).doc(uid);
    const userData = {
        uid: uid,
        email: email,
        role: initialRole, // Store role in Firestore as well for easy querying
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        // Add public profile details here (e.g., display name, profile picture URL)
    };
    
    // --- 4. Create Role-Specific Profile Document ---
    if (initialRole === 'candidate') {
        // Create basic candidate profile
        dbAdmin.collection(COLLECTIONS.CANDIDATES).doc(uid).set({ 
            userId: uid, 
            status: 'pending_onboarding',
            onboarding_complete: false,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } else if (initialRole === 'employer') {
        // Create basic employer profile
        dbAdmin.collection(COLLECTIONS.EMPLOYERS).doc(uid).set({
            userId: uid,
            companyName: '',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } else if (initialRole === 'admin') {
         dbAdmin.collection(COLLECTIONS.ADMINS).doc(uid).set({
            userId: uid,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    }

    // Write to the main users collection
    await userRef.set(userData, { merge: true });

    console.log(`User ${uid} profile and claims initialized with role: ${initialRole}`);
});