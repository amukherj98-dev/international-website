const mongoose = require("mongoose");

const correctionSchema = new mongoose.Schema({
  contentType: { type: String, enum: ["Guide", "Neighbourhood", "Story"], required: true },
  contentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  note: { type: String, required: true, trim: true },
  submitterEmail: { type: String, trim: true },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Correction", correctionSchema);
