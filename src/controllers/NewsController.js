class NewsController {
  // [GET] /news
  index(req, res, next) {
    // res.headers.Authorization = `Bearer ${'slug center-dashboard'}`;
    res.render('news/news');
  }

  // [GET] /news/:slug center-dashboard
  domestic(req, res, next) {
    // // Lấy dữ liệu tin tức trong nước từ database:
    // const news = await db.collection('news').find({ category: 'domestic' }).toArray();
    // // Gửi dữ liệu về client dưới dạng JSON
    // res.json(news);

    res.render('news/domestic-news');
  }

  // [GET] /news/international
  international(req, res, next) {
    res.render('news/international-news');
  }
}

module.exports = new NewsController();
