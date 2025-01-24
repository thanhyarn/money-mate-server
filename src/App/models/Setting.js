const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  currency: {
    type: String,
    default: "VND",
  },
  language: {
    type: String,
    default: "vi",
  },
  exportFormat: {
    type: String,
    enum: ["CSV", "PDF"],
    default: "CSV",
  },
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Settings", SettingsSchema);
