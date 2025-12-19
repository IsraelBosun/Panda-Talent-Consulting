// This file is exclusively for Cloud Functions (backend)
const admin = require('firebase-admin');
const functions = require('firebase-functions');
// FIX: Import getFirestore explicitly to avoid the "not a function" error
const { getFirestore } = require('firebase-admin/firestore');

// Check if a Firebase app instance already exists to prevent re-initialization 
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: "panda-talent-marketplace" 
    });
}

const authAdmin = admin.auth();

/**
 * FIX: Use getFirestore() helper.
 * Since your database ID in the console is "default", we pass it here.
 */
const dbAdmin = getFirestore("default");

// Export all objects used in index.js
module.exports = { authAdmin, dbAdmin, admin, functions };













// // This file is exclusively for Cloud Functions (backend)

// const admin = require('firebase-admin');
// const functions = require('firebase-functions'); // Add functions here just in case, though often not needed in config

// // Check if a Firebase app instance already exists to prevent re-initialization 
// // if (!admin.apps.length) {
// //     admin.initializeApp();
// // }

// if (!admin.apps.length) {
//     admin.initializeApp({
//         projectId: "panda-talent-marketplace" // Ensure this is your actual project ID
//     });
// }

// const authAdmin = admin.auth();
// const dbAdmin = admin.firestore("default");

// // Export all objects used in index.js
// module.exports = { authAdmin, dbAdmin, admin, functions };