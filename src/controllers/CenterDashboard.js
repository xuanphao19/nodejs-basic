const CenterDashboard = () => {
  return {
    // [GET] "/"
    home: async (req, res, next) => {
      res.render('dashboards/home', {});
    },
    // [GET] "/about"
    about(req, res, next) {
      res.render('dashboards/about');
    },
    // [GET] "/contact"
    contact(req, res, next) {
      res.render('dashboards/contact', { layout: 'head-single' });
      // Có thể thêm option để thay đổi layout.
    },
  };
};

module.exports = CenterDashboard();
