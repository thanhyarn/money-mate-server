const Transaction = require("../models/Transaction");

class TransactionController {
  // GET /get-all
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.find().populate("category userId");
      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching transactions",
        error: err.message,
      });
    }
  }

  // GET /get/:id
  async getTransactionById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById(id).populate(
        "category userId"
      );

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.status(200).json(transaction);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching transaction",
        error: err.message,
      });
    }
  }

  // POST /create
  async createTransaction(req, res) {
    try {
      const { userId, type, amount, date, category, note } = req.body;

      const newTransaction = new Transaction({
        userId,
        type,
        amount,
        date,
        category,
        note,
      });

      await newTransaction.save();

      res.status(201).json({
        message: "Transaction created successfully",
        data: newTransaction,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error creating transaction",
        error: err.message,
      });
    }
  }

  // PUT /update/:id
  async updateTransaction(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.status(200).json({
        message: "Transaction updated successfully",
        data: updatedTransaction,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error updating transaction",
        error: err.message,
      });
    }
  }

  // DELETE /delete/:id
  async deleteTransaction(req, res) {
    try {
      const { id } = req.params;

      const deletedTransaction = await Transaction.findByIdAndDelete(id);
      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.status(200).json({
        message: "Transaction deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting transaction",
        error: err.message,
      });
    }
  }

  // GET /get-by-month
  async getTransactionsByMonth(req, res) {
    try {
      const { month, year, userId } = req.query; // Expect month, year, and userId as query params
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(`${year}-${month}-31`);

      const transactions = await Transaction.find({
        userId,
        date: { $gte: startDate, $lte: endDate },
      }).populate("category userId");

      const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      res.status(200).json({
        message: "Transactions fetched successfully",
        data: {
          transactions,
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: "Error fetching transactions by month",
        error: err.message,
      });
    }
  }
}

module.exports = new TransactionController();
