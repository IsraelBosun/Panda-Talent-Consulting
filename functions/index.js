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
// CRITICAL: Ensure 'admin' is imported from your config file
const { authAdmin, dbAdmin, admin } = require('././config/firebase-admin'); 

// --- Firestore Collection Names (Centralized for consistency) ---
const COLLECTIONS = {
    USERS: 'users',
    CANDIDATES: 'candidates',
    EMPLOYERS: 'employers',
    ADMINS: 'admins'
};

const FIRST_ADMIN_EMAIL = 'bluehydra001@gmail.com'; 

/**
 * 1. Cloud Function triggered on new Auth user creation.
 * Only handles the special case for the SUPER ADMIN email.
 */
exports.processSignUp = functions.auth.user().onCreate(async (user) => {
    // FIX: Add this safety check. If the function is being analyzed by the tooling 
    // outside of a real execution context, 'user' might be undefined. 
    // However, if the error is still persisting, this means the deployment 
    // tooling is treating this function incorrectly. Let's remove this check 
    // and assume the problem is the dependency chain.
    
    // We will stick to the previous version but ensure all paths lead to a defined variable.
    
    // Original working logic:
    const { uid, email } = user;
    
    // Check if the user is the designated super admin
    if (email === FIRST_ADMIN_EMAIL) {
        try {
            // Set Admin Claim immediately
            await authAdmin.setCustomUserClaims(uid, { role: 'admin' });
            // ... (Rest of Admin setup)
            await dbAdmin.collection(COLLECTIONS.ADMINS).doc(uid).set({
                userId: uid,
                email: email,
                role: 'admin',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            await dbAdmin.collection(COLLECTIONS.USERS).doc(uid).set({
                uid: uid,
                email: email,
                role: 'admin',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }, { merge: true });

        } catch (error) {
            console.error("Error setting ADMIN claims/profile:", error);
        }
    }
    // Non-admin users will be handled by the 'finalizeSignup' callable function.
});

/**
 * 2. Callable Function invoked by the client *after* signup to securely finalize the profile.
 */
exports.finalizeSignup = functions.https.onCall(async (data, context) => {
    // 1. Authentication Check
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }
    
    const uid = context.auth.uid;
    const { role } = data; 

    if (role !== 'candidate' && role !== 'employer') {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid role specified.');
    }

    // --- Set Custom Claim (RBAC) ---
    try {
        await authAdmin.setCustomUserClaims(uid, { role });
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Failed to set custom user claims.');
    }

    // --- Create Profile Documents ---
    const userRef = dbAdmin.collection(COLLECTIONS.USERS).doc(uid);
    
    // Update the main users document with the determined role
    await userRef.set({
        role: role,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    // Create role-specific profile document
    if (role === 'candidate') {
        await dbAdmin.collection(COLLECTIONS.CANDIDATES).doc(uid).set({ 
            userId: uid, 
            status: 'pending_onboarding',
            onboarding_complete: false,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } else if (role === 'employer') {
        await dbAdmin.collection(COLLECTIONS.EMPLOYERS).doc(uid).set({
            userId: uid,
            companyName: '',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    }

    return { success: true, role };
});