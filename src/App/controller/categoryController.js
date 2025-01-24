const Category = require("../models/Category");

class CategoryController {
  // GET /get-all
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching categories", error: err.message });
    }
  }

  // GET /get/:id
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching category", error: err.message });
    }
  }

  // POST /create
  async createCategory(req, res) {
    try {
      const { name, type, icon, userId } = req.body;

      const newCategory = new Category({
        name,
        type,
        icon,
        userId,
      });

      await newCategory.save();

      res.status(201).json({
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating category", error: err.message });
    }
  }

  // PUT /update/:id
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating category", error: err.message });
    }
  }

  // DELETE /delete/:id
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({
        message: "Category deleted successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting category", error: err.message });
    }
  }
}

module.exports = new CategoryController();
