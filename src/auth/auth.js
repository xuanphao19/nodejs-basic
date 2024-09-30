const firebaseAdmin = require('../config/fb/firebaseConfig');

/* ===================== */

// Middleware xác thực Firebase token
async function authToken(req, res, next) {
  // const idToken = req.headers.authorization?.split(' ')[1];
  // if (!idToken) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  // try {
  //   const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
  //   req.user = decodedToken;
  next();
  // } catch (error) {
  //   console.error('Token verification failed:', error);
  //   return res.status(403).json({ message: 'Forbidden' });
  // }
  // res.send('dashboards/about');
}

module.exports = authToken;
/* ================== */
