// This file is exclusively for Cloud Functions (backend)

const admin = require('firebase-admin');
const functions = require('firebase-functions'); // Add functions here just in case, though often not needed in config

// Check if a Firebase app instance already exists to prevent re-initialization 
if (!admin.apps.length) {
    admin.initializeApp();
}

const authAdmin = admin.auth();
const dbAdmin = admin.firestore();

// Export all objects used in index.js
module.exports = { authAdmin, dbAdmin, admin, functions };