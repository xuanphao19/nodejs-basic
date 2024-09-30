require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const route = require('./routes/');
const { PORT, HOST_NAME } = process.env;
const { connectToDB } = require('./db/mongodb.js');
const authToken = require('./auth/auth.js');

const app = express();
app.use(morgan('combined'));
// morgan => Xem Log Request!
app.use(express.json());

async function main() {
  // connect DB:
  const db = await connectToDB('myDatabase');
  // Chỉ định địa chỉ tài nguyên tĩnh cho app.
  app.use(express.static(path.join(__dirname, 'public')));
  // Templates Engine: const hbs = exphbs.create({ extname: "hbs" });
  app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('view engine', '.hbs');
  // Đăng ký template engine handlebars với đuôi .hbs
  app.set('views', path.join(__dirname, 'resources', 'views'));

  const depend = {
    db,
    authToken,
    // Các dependency khác
  };
  route(app, depend, authToken); // Router init
}
main().catch(console.error);

const port = PORT || 8002;
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

/**
// =======================
//  ==== Lý thuyết cơ bản: ====
// =======================

// ⭐ Các phương thức HTTP:
// post(); get(); put(); patch(); delete();
// Create-Read-Update-Delete: C.post; R.get; U.put; U.patch; D.delete;

//🌺 post():
  + Mục đích: Gửi dữ liệu lên server để tạo một tài nguyên mới.
  + Đặc điểm:
  Dữ liệu được gửi đi nằm trong body của yêu cầu.
  Có thể gửi dữ liệu lớn và phức tạp (như form đăng ký, upload file).
  Thường dùng để thay đổi trạng thái server (vd: thêm dữ liệu vào CSDL).
  + Ứng dụng: Tạo mới tài nguyên, đăng ký tài khoản, gửi form liên hệ, v.v.
  + Định nghĩa route cho post: // app.get(path, callback)
  app.post('/submit', (req, res) => {
    res.send('Form submitted!');
  });

//🌺 get():
  + Mục đích: Yêu cầu lấy dữ liệu từ server.
  + Đặc điểm:
  Dữ liệu đính kèm trong URL dưới dạng query string (ví dụ: ?key=value).
  Không thay đổi trạng thái hoặc ảnh hưởng đến server; (chỉ lấy dữ liệu).
  Không dùng GET để gửi dữ liệu nhạy cảm (mật khẩu, thông tin cá nhân).
  + Ứng dụng: Lấy dữ liệu từ API: danh sách sản phẩm, người dùng, v.v.
  + Định nghĩa route cho get: // app.get(path, callback)
  app.get('/', (req, res) => {
    res.end('Hello World!');
  });

//🌺 put():
  + Mục đích: Cập nhật hoặc thay thế hoàn toàn tài nguyên hiện có.
  + Đặc điểm:
  Gửi dữ liệu đầy đủ của tài nguyên trong body.
  Nếu tài nguyên chưa tồn tại, có thể tạo mới (tuỳ thuộc vào cấu hình server).
  + Ứng dụng:
  Replace dữ liệu của một đối tượng, như cập nhật thông tin người dùng.
  + Định nghĩa route cho put: // app.put(PORT, callback)
  app.put('PORT', (req, res) => {
    res.send('Form data!');
  });

//🌺 patch():
  + Mục đích: Cập nhật một phần tài nguyên hiện có.
  + Đặc điểm:
  Chỉ gửi phần dữ liệu cần cập nhật, thay vì toàn bộ như PUT.
  Thực hiện các thay đổi nhỏ mà không cần gửi lại tất cả dữ liệu.
  + Ứng dụng: Sửa một số thuộc tính của Obj, không thay thế toàn bộ.
  + Định nghĩa route cho patch: // app.patch(PORT, callback)
  app.patch('PORT', (req, res) => {
    res.send('Form data!');
  });

//🌺 delete():
  + Mục đích: Xoá tài nguyên khỏi server.
  + Đặc điểm:
  Không yêu cầu body; chỉ cần URL chứa tài nguyên cần xoá.
  Thay đổi trạng thái server bằng việc loại bỏ dữ liệu.
  + Ứng dụng: Xoá tài khoản, xoá bài viết, xoá bình luận, v.v.
  + Định nghĩa route cho delete: // app.delete(path, callback)
  app.delete("URL/:id/delete", (req, res) => {
    // Điều hướng về trang cần thiết.
  });

//🌺 options():
  + Mục đích: Kiểm tra các phương thức HTTP mà server hỗ trợ cho URL cụ thể.
  + Đặc điểm:
  Server trả về thông tin về các phương thức hợp lệ mà nó có thể xử lý.
  Hữu ích cho việc kiểm tra hoặc trước khi gửi các yêu cầu phức tạp (CORS preflight).
  + Ứng dụng:
  Thường được gửi tự động bởi trình duyệt trước khi gửi các yêu cầu PUT, PATCH, DELETE.

//🌺 head():
  + Mục đích: Giống GET, nhưng chỉ trả về phần header, không trả về body.
  + Đặc điểm:
  Dùng để kiểm tra header (thông tin về tài nguyên) không cần lấy dữ liệu.
  Kiểm tra xem tài nguyên có tồn tại không mà không tải toàn bộ dữ liệu.
  + Ứng dụng:
  Kiểm tra thông tin tài nguyên (content type, last modified, v.v.) mà không tải toàn bộ dữ liệu.

//🌺 CONNECT: Dùng để thiết lập một tunnel TCP thông qua HTTP proxy. Ít được sử dụng.
//🌺 TRACE: Dùng để kích hoạt một vòng lặp message loop để xác định các hệ thống và các xử lý mà một yêu cầu đã trải qua.

// ⭐ Bảo mật:
  Không gửi dữ liệu nhạy cảm qua GET.
  Validate và sanitize dữ liệu đầu vào => ngăn chặn tấn công.
  Sử dụng HTTPS để bảo mật giao tiếp.
  Cập nhật các thư viện và framework thường xuyên => Vá lỗi.

// ⭐ Các Phương Thức Liên Quan đến Express:
//🌺 app.use(middleware);
  + Mục đích: Thêm middleware vào ứng dụng.
  + Đặc điểm: Middleware có thể xử lý các yêu cầu trước khi chúng đến các route.
  + Ứng dụng: app.use(express.json()); // Sử dụng middleware để phân tích JSON

//🌺 app.listen(port, callback);
  + Mục đích: Khởi động server và listen các yêu cầu.
  app.listen(PORT, (err, server) => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

//🌺 app.set(setting, value);
  + Mục đích: Thiết lập giá trị cho một cài đặt của ứng dụng (ví dụ như chế độ môi trường).
  app.set('view engine', 'pug'); // Thiết lập engine render view

//🌺 app.engine(ext, callback);
  + Mục đích: Đăng ký một engine template cho một loại file cụ thể (ví dụ như .html hoặc .pug).
  app.engine('html', require('ejs').renderFile); // Sử dụng EJS để render file .html

//🌺 app.route(path);
  + Mục đích: Tạo chuỗi xử lý route cho một đường dẫn cụ thể mà có thể xử lý nhiều phương thức HTTP khác nhau.
  app.route('/book')
    .get((req, res) => {
      res.send('Get a book');
    })
    .post((req, res) => {
      res.send('Add a book');
  });

//🌺 app.param(name, callback);
  + Mục đích: Thêm middleware xử lý các param trong route, chẳng hạn như ID.
  app.param('id', (req, res, next, id) => {
    console.log('ID:', id);
    next();
  });

// ⭐ Thuộc Tính (Properties) của Express Application:
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

// ⭐ Các Phương Thức Sự Kiện:
//🌺 Các phương thức sự kiện (Event Methods):
//🌺 on và addListener: // Đăng ký một listener cho một sự kiện nhất định.
//🌺 removeListener và removeAllListeners: // Gỡ bỏ một hoặc tất cả các listener đã đăng ký cho một sự kiện.

// ⭐ Các khái niệm khác:
  + CORS: Cross-Origin Resource Sharing. Cho phép các trang web từ các domain khác truy cập vào tài nguyên của bạn.
  + REST API: Một kiến trúc để thiết kế các API web dựa trên các phương thức HTTP.
  + HTTP status code: Các mã trạng thái HTTP (200, 404, 500) để chỉ ra kết quả của một yêu cầu.
    🟢 2xx: Thành công (Success)
    200 OK: Yêu cầu đã được thực hiện thành công, và server trả về tài nguyên được yêu cầu. Đây là mã trạng thái phổ biến nhất khi một yêu cầu được xử lý thành công.
    201 Created: Tài nguyên mới đã được tạo thành công. Thường được sử dụng sau khi thực hiện một yêu cầu POST để tạo một đối tượng mới.
    204 No Content: Yêu cầu đã được thực hiện thành công, nhưng server không trả về bất kỳ nội dung nào trong body của response.

    🟡 3xx: Status tài nguyên
    301 Moved Permanently: Tài nguyên đã được di chuyển vĩnh viễn đến một URL mới. Các liên kết đến tài nguyên cũ nên được cập nhật.
    302 Found: Tài nguyên tạm thời được chuyển hướng đến một URL khác. Thông thường được sử dụng cho các chuyển hướng dựa trên phiên (session).
    304 Not Modified: Tài nguyên chưa được sửa đổi kể từ lần yêu cầu cuối cùng. Browser có thể sử dụng bản sao được lưu trong cache.
    307 Temporary Redirect: Tương tự 302, nhưng yêu cầu phải được gửi lại với cùng phương thức HTTP.
    308 Permanent Redirect: Tương tự 301, nhưng yêu cầu phải được gửi lại với cùng phương thức HTTP.

    🔴 4xx: Lỗi của client
    400 Bad Request: Yêu cầu gửi đến server không hợp lệ (ví dụ: cú pháp sai, dữ liệu thiếu).
    401 Unauthorized: Client không được phép truy cập tài nguyên. Thường xảy ra khi client không cung cấp thông tin xác thực hợp lệ (ví dụ: tên đăng nhập, mật khẩu).
    403 Forbidden: Client được xác thực nhưng không có quyền truy cập vào tài nguyên.
    404 Not Found: Tài nguyên được yêu cầu không tồn tại trên server.

    🛑 5xx: Lỗi của server
    500 Internal Server Error: Đã xảy ra lỗi nghiêm trọng trên server, ngăn cản server hoàn thành yêu cầu.
    502 Bad Gateway: Server đóng vai trò như một gateway hoặc proxy nhận được một response không hợp lệ từ một server upstream.
    503 Service Unavailable: Server tạm thời không thể xử lý yêu cầu.
    ===> Mã trạng thái HTTP là gì? 8 mã HTTP thường gặp và cách khắc phục:
    https://quantrimang.com/cong-nghe/danh-sach-ma-trang-thai-http-http-status-code-day-du-149916
    https://lptech.asia/kien-thuc/ma-trang-thai-http-la-gi-8-ma-http-thuong-gap-va-cach-khac-phuc




    // const express = require('express');
    // const app = express();
    // const port = 3000;
    // // Middleware để phân tích JSON trong request body
    // app.use(express.json());
    // // Route để lấy danh sách sản phẩm
    // app.get('/products', (req, res) => {
    //     // Lấy danh sách sản phẩm từ database
    //     const products = [
    //         { id: 1, name: 'Sản phẩm A' },
    //         { id: 2, name: 'Sản phẩm B' }
    //     ];
    //     res.json(products);
    // });
    // // Route để tạo một sản phẩm mới
    // app.post('/products/cre', (req, res) => {
    //     const newProduct = req.body;
    //     // Lưu sản phẩm mới vào database
    //     res.status(201).json(newProduct);
    // });
    // // Route để cập nhật thông tin một sản phẩm
    // app.patch('/products/:id/edit', (req, res) => {
    //     const productId = req.params.id;
    //     const updates = req.body;
    //     // Cập nhật sản phẩm trong database
    //     res.json({ message: 'Sản phẩm đã được cập nhật' });
    // });
    // app.listen(port, () => {
    //     console.log(`Server is running on port ${port}`);
    // });
*/
