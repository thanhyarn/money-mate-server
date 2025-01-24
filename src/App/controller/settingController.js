const Settings = require("../models/Settings");

class SettingsController {
  // GET /get/:userId
  async getSettingsByUserId(req, res) {
    try {
      const { userId } = req.params;

      const settings = await Settings.findOne({ userId });
      if (!settings) {
        return res.status(404).json({ message: "Settings not found" });
      }

      res.status(200).json(settings);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching settings",
        error: err.message,
      });
    }
  }

  // POST /create
  async createSettings(req, res) {
    try {
      const { userId, currency, language, exportFormat, theme } = req.body;

      // Kiểm tra nếu đã có settings cho userId
      const existingSettings = await Settings.findOne({ userId });
      if (existingSettings) {
        return res.status(400).json({
          message: "Settings already exist for this user",
        });
      }

      const newSettings = new Settings({
        userId,
        currency,
        language,
        exportFormat,
        theme,
      });

      await newSettings.save();

      res.status(201).json({
        message: "Settings created successfully",
        data: newSettings,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error creating settings",
        error: err.message,
      });
    }
  }

  // PUT /update/:userId
  async updateSettings(req, res) {
    try {
      const { userId } = req.params;
      const updatedData = req.body;

      const updatedSettings = await Settings.findOneAndUpdate(
        { userId },
        updatedData,
        { new: true }
      );

      if (!updatedSettings) {
        return res.status(404).json({ message: "Settings not found" });
      }

      res.status(200).json({
        message: "Settings updated successfully",
        data: updatedSettings,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error updating settings",
        error: err.message,
      });
    }
  }

  // DELETE /delete/:userId
  async deleteSettings(req, res) {
    try {
      const { userId } = req.params;

      const deletedSettings = await Settings.findOneAndDelete({ userId });
      if (!deletedSettings) {
        return res.status(404).json({ message: "Settings not found" });
      }

      res.status(200).json({
        message: "Settings deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting settings",
        error: err.message,
      });
    }
  }
}

module.exports = new SettingsController();
