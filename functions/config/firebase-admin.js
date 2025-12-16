// This file is exclusively for Cloud Functions (backend)

const admin = require('firebase-admin');

// Check if a Firebase app instance already exists to prevent re-initialization 
// in development/testing environments. In a Cloud Function environment, 
// this is typically not strictly necessary but is good practice.
if (!admin.apps.length) {
    admin.initializeApp();
}

const authAdmin = admin.auth();
const dbAdmin = admin.firestore();

// Export the Admin SDK objects
module.exports = { authAdmin, dbAdmin, admin };