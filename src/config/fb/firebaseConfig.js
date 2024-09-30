// firebaseConfig.js
const admin = require('firebase-admin');
// const serviceAccount = require('./service-account.json');

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE)),
  databaseURL: 'https://useauthnb-default-rtdb.asia-southeast1.firebasedatabase.app',
});

module.exports = admin;
/* firebase-xuanphao19@useauthnb.iam.gserviceaccount.com */
