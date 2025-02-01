const express = require("express");
const router = express.Router();
const settingsController = require("../App/controller/settingController");

// Tạo cấu hình người dùng
router.post("/create", settingsController.createSettings);

// Cập nhật cấu hình người dùng
router.put("/update/:userId", settingsController.updateSettings);

// Xóa cấu hình người dùng
router.delete("/delete/:userId", settingsController.deleteSettings);

// Lấy thông tin cấu hình của người dùng
router.get("/get/:userId", settingsController.getSettingsByUserId);

module.exports = router;
