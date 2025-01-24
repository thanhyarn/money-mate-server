const User = require("../models/User");

class UserController {
  // GET /get-all
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching users",
        error: err.message,
      });
    }
  }

  // GET /get/:id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching user",
        error: err.message,
      });
    }
  }

  // POST /create
  async createUser(req, res) {
    try {
      const { username, email, password, theme } = req.body;

      // Kiểm tra email hoặc username đã tồn tại chưa
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res.status(400).json({
          message: "Username or email already exists",
        });
      }

      const newUser = new User({
        username,
        email,
        password, // Bạn nên hash mật khẩu trước khi lưu (e.g., bằng bcrypt)
        theme,
      });

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        data: newUser,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error creating user",
        error: err.message,
      });
    }
  }

  // PUT /update/:id
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error updating user",
        error: err.message,
      });
    }
  }

  // DELETE /delete/:id
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting user",
        error: err.message,
      });
    }
  }

  // POST /login
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Kiểm tra email có tồn tại không
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // So sánh mật khẩu (giả sử bạn sử dụng bcrypt để hash)
      const isPasswordValid = password === user.password; // Thay thế bằng bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      res.status(200).json({
        message: "Login successful",
        data: { id: user._id, username: user.username, email: user.email },
      });
    } catch (err) {
      res.status(500).json({
        message: "Error logging in user",
        error: err.message,
      });
    }
  }
}

module.exports = new UserController();
