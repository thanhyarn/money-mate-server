const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./src/routers");
const db = require("./src/config/dbConfig");
const cookieParser = require("cookie-parser");
db.connect();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // 🔥 Chỉ cho phép frontend truy cập
    credentials: true, // 🔥 Bắt buộc để gửi Cookie
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

route(app);

const PORT = 3003;

app.listen(PORT, () => console.log(`HTTP server listening on port ${PORT}`));
