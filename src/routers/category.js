const express = require("express");
const router = express.Router();
const categoryController = require("../App/controller/categoryController");

// Tạo một danh mục mới
router.post("/create", categoryController.createCategory);

// Cập nhật một danh mục
router.put("/update/:id", categoryController.updateCategory);

// Xóa một danh mục
router.delete("/delete/:id", categoryController.deleteCategory);

// Lấy danh sách tất cả danh mục
router.get("/get-all", categoryController.getAllCategories);

// Lấy thông tin chi tiết của một danh mục
router.get("/get/:id", categoryController.getCategoryById);

module.exports = router;
