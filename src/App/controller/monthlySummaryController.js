const MonthlySummary = require("../models/MonthlySummary");

class MonthlySummaryController {
  // GET /get-all
  async getAllMonthlySummaries(req, res) {
    try {
      const summaries = await MonthlySummary.find();
      res.status(200).json(summaries);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching monthly summaries",
        error: err.message,
      });
    }
  }

  // GET /get/:month
  async getMonthlySummaryByMonth(req, res) {
    try {
      const { month } = req.params; // Example: "01-2025"
      const summary = await MonthlySummary.findOne({ month });

      if (!summary) {
        return res.status(404).json({ message: "Monthly summary not found" });
      }

      res.status(200).json(summary);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching monthly summary",
        error: err.message,
      });
    }
  }

  // POST /create
  async createMonthlySummary(req, res) {
    try {
      const { userId, month, totalIncome, totalExpense, balance } = req.body;

      const newSummary = new MonthlySummary({
        userId,
        month,
        totalIncome,
        totalExpense,
        balance,
      });

      await newSummary.save();

      res.status(201).json({
        message: "Monthly summary created successfully",
        data: newSummary,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error creating monthly summary",
        error: err.message,
      });
    }
  }

  // PUT /update/:id
  async updateMonthlySummary(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedSummary = await MonthlySummary.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      if (!updatedSummary) {
        return res.status(404).json({ message: "Monthly summary not found" });
      }

      res.status(200).json({
        message: "Monthly summary updated successfully",
        data: updatedSummary,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error updating monthly summary",
        error: err.message,
      });
    }
  }

  // DELETE /delete/:id
  async deleteMonthlySummary(req, res) {
    try {
      const { id } = req.params;

      const deletedSummary = await MonthlySummary.findByIdAndDelete(id);
      if (!deletedSummary) {
        return res.status(404).json({ message: "Monthly summary not found" });
      }

      res.status(200).json({
        message: "Monthly summary deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting monthly summary",
        error: err.message,
      });
    }
  }
}

module.exports = new MonthlySummaryController();
