const dashboardRoute = require('./dashboards');
const { handleInfoUser } = require('../db/mongodb.js');
const User = require('../models/UserModel.js');
const newRoute = require('./news');

const newUser = User.create('Nguyễn Văn HOST_NAME', 'nguyenxuanphao⭐169⭐@gmail.com', 'password', 'Hà Nội ⭐');

const route = async (app, depend) => {
  const db = depend.db;

  const authToken = depend.authToken;
  const user = await handleInfoUser(db, 'newUser', newUser);
  // Thêm các logic khác sử dụng các hàm từ db/mongodb.js

  // app.use('/login', authenticateToken, loginRoute);
  app.use('/news', authToken, newRoute);
  app.use('/', authToken, dashboardRoute);
  await db.client.close();
};

module.exports = route;
