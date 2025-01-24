const express = require("express");
const router = express.Router();
const transactionController = require("../App/controller/transactionController");

// Tạo một giao dịch mới
router.post("/create", transactionController.createTransaction);

// Cập nhật một giao dịch
router.put("/update/:id", transactionController.updateTransaction);

// Xóa một giao dịch
router.delete("/delete/:id", transactionController.deleteTransaction);

// Lấy danh sách tất cả giao dịch
router.get("/get-all", transactionController.getAllTransactions);

// Lấy thông tin chi tiết của một giao dịch
router.get("/get/:id", transactionController.getTransactionById);

// Lấy tất cả giao dịch theo tháng
router.get("/get-by-month", transactionController.getTransactionsByMonth);

module.exports = router;
