// Import module:
/*
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── css
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.hbs
    ├── index.hbs
    └── layout.hbs
*/

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");

require("dotenv").config();
const { PORT, HOST_NAME } = process.env;

const app = express();
// express => pt các ứng dụng web, RESTful API, và dịch vụ backend.

app.use(express.static(path.join(__dirname, "public")));
// Chí định địa chỉ tài nguyên tĩnh cho app.

app.use(morgan("combined"));
// morgan('combined') // Log ra Kết quả Request!

// Templates engine:
// const hbs = exphbs.create({ extname: "hbs" });
app.engine(".hbs", exphbs.engine({ extname: ".hbs" })); //1&2
app.set("view engine", ".hbs"); //1&2
// 1&2 Đăng ký template engine handlebars với đuôi .hbs
app.set("views", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
  // Khai báo route
  res.render(`home`);
});
app.get("/new", (req, res) => {
  // Khai báo route
  res.render(`new`);
});

app.listen(PORT, HOST_NAME, (err, server) => {
  //⭐ app.listen(PORT); // Khởi động server và listen các yêu cầu.
  //⭐ app.listen(3000, '192.168.1.100', () => {});
  //⭐ Chỉ định địa chỉ IP hoặc tên miền mà server sẽ lắng nghe
  //⭐ Nếu muốn server có thể truy cập từ các máy khác trên mạng, hãy thay thế 'localhost' bằng địa chỉ IP công cộng hoặc tên miền của máy chủ.
  //🌻 Callback được gọi khi server đã bắt đầu lắng nghe thành công.
  //🌻 err: Đối tượng lỗi. Nếu có lỗi xảy ra trong quá trình khởi động server
  //🌻 server: Sử dụng đối tượng server để:
  // + Kiểm tra trạng thái server: chạy or không, số lượng kết nối hiện tại.
  // + Đóng server: Khi cần dừng hoạt động của server.
  // + Thay đổi các cấu hình của server: thời gian, số lượng giữ kết nối,
  // + Thêm các listener cho các sự kiện của server: (tùy thuộc framework)
  // 1. 🌻 Callback Kết nối cơ sở dữ liệu:
  // connectToDatabase(); // Kết nối với cơ sở dữ liệu khi server khởi động.
  // 2. 🌻 Callback Kiểm tra cấu hình:
  // console.log('Environment:', process.env.NODE_ENV);
  // console.log(`Server is running on http://localhost:${PORT}`);
  // 3. 🌻 Callback Khởi động cron job:
  // startScheduledTasks(); // Khởi động các công việc định kỳ (cron jobs) khi server bắt đầu
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  // 4. 🌻 Callback Đăng ký các sự kiện khác:
});

/*
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/xuanphao19/nodejs-basic.git
git push -u origin main
// =======================
//  ==== Lý thuyết cơ bản: ====
// =======================

//🌺 get(), post(), put(), delete().
//🌺 app.get(path, callback); // Định nghĩa route cho phương thức HTTP GET.
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
//🌺 app.post(path, callback); // Định nghĩa route cho phương thức HTTP POST.
    app.post('/submit', (req, res) => {
      res.send('Form submitted!');
    });
//🌺 app.use(middleware); //Thêm middleware vào ứng dụng. Middleware có thể xử lý các yêu cầu trước khi chúng đến các route.
    app.use(express.json()); // Sử dụng middleware để phân tích JSON
//🌺 app.listen(port, callback); // Khởi động server và listen các yêu cầu.
  app.listen(PORT, (err, server) => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
//🌺 app.set(setting, value); // Thiết lập giá trị cho một cài đặt của ứng dụng (ví dụ như chế độ môi trường).
  app.set('view engine', 'pug'); // Thiết lập engine render view
//🌺 app.engine(ext, callback); // Đăng ký một engine template cho một loại file cụ thể (ví dụ như .html hoặc .pug).
  app.engine('html', require('ejs').renderFile); // Sử dụng EJS để render file .html
//🌺 app.route(path); // Tạo chuỗi xử lý route cho một đường dẫn cụ thể mà có thể xử lý nhiều phương thức HTTP khác nhau.
  app.route('/book')
    .get((req, res) => {
      res.send('Get a book');
    })
    .post((req, res) => {
      res.send('Add a book');
  });
//🌺 app.param(name, callback); // Thêm middleware xử lý các tham số trong route, chẳng hạn như ID.
  app.param('id', (req, res, next, id) => {
    console.log('ID:', id);
    next();
  });
//🌺 app. Thuộc tính (Properties):
//🌺 settings: Đối tượng này chứa các cấu hình của ứng dụng, chẳng hạn như env (môi trường), view engine (engine render view), và nhiều cài đặt khác.
  + app.get('env'); // 'development' hoặc 'production'
//🌺 locals: // Đối tượng này chứa các biến toàn cục có thể được truy cập trong quá trình render view.
  + app.locals.title = 'My App';
//🌺 mountpath: // Đường dẫn mà ứng dụng con được gắn vào (nếu có).
  + app.mountpath; // '/'
//🌺 cache và engines: // Chứa các engine render view và cache cho view đã được biên dịch.
  + app.engines; // { '.pug': [Function: View] }
//🌺 _events và _eventsCount: // Chứa các sự kiện được đăng ký trong ứng dụng. Đây là cơ chế nội bộ giúp Express lắng nghe và xử lý các sự kiện.
//🌺 Các phương thức sự kiện (Event Methods):
//🌺 on và addListener: // Đăng ký một listener cho một sự kiện nhất định.
//🌺 removeListener và removeAllListeners: // Gỡ bỏ một hoặc tất cả các listener đã đăng ký cho một sự kiện.
*/
