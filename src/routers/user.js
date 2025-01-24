const express = require("express");
const router = express.Router();
const userController = require("../App/controller/userController.js");

// Tạo một người dùng mới
router.post("/create", userController.createUser);

// Cập nhật thông tin người dùng
router.put("/update/:id", userController.updateUser);

// Xóa một người dùng
router.delete("/delete/:id", userController.deleteUser);

// Lấy danh sách tất cả người dùng
router.get("/get-all", userController.getAllUsers);

// Lấy thông tin chi tiết của một người dùng
router.get("/get/:id", userController.getUserById);

module.exports = router;
