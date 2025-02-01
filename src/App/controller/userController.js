require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

class UserController {
  // GET /get-all
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}, "-password"); // Không trả về mật khẩu
      res.status(200).json(users);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: err.message });
    }
  }

  // GET /get/:id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching user", error: err.message });
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
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        theme,
      });
      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    }
  }

  // PUT /update/:id
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { password, ...updatedData } = req.body;

      // Nếu có cập nhật mật khẩu, mã hóa trước khi lưu
      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      }).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User updated successfully", data: updatedUser });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating user", error: err.message });
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
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting user", error: err.message });
    }
  }

  // POST /login (Lưu JWT vào HttpOnly Cookie)
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // So sánh mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Tạo JWT Token
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });

      // Lưu vào HttpOnly Cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Đặt `true` nếu dùng HTTPS
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      });

      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error logging in user", error: err.message });
    }
  }

  // GET /me (Kiểm tra trạng thái đăng nhập)
  async getMe(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  }

  // POST /logout (Xóa Cookie)
  async logoutUser(req, res) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  }
}

module.exports = new UserController();
