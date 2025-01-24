const express = require("express");
const router = express.Router();
const monthlySummaryController = require("../App/controller/monthlySummaryController.js");

// Tạo dữ liệu tổng hợp hàng tháng
router.post("/create", monthlySummaryController.createMonthlySummary);

// Cập nhật dữ liệu tổng hợp hàng tháng
router.put("/update/:id", monthlySummaryController.updateMonthlySummary);

// Xóa dữ liệu tổng hợp hàng tháng
router.delete("/delete/:id", monthlySummaryController.deleteMonthlySummary);

// Lấy danh sách tất cả dữ liệu tổng hợp hàng tháng
router.get("/get-all", monthlySummaryController.getAllMonthlySummaries);

// Lấy thông tin tổng hợp của một tháng cụ thể
router.get("/get/:month", monthlySummaryController.getMonthlySummaryByMonth);

module.exports = router;
