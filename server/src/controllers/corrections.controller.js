const { validationResult } = require("express-validator");
const Correction = require("../models/Correction");
const { notifyAdmin } = require("../services/emailService");

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid report", errors: errors.array() });
    }

    const { contentType, contentId, note, submitterEmail } = req.body;
    const correction = await Correction.create({
      contentType,
      contentId,
      note: note.trim(),
      submitterEmail: submitterEmail?.trim(),
    });

    const adminUrl = `${process.env.PUBLIC_APP_URL || ""}/admin/corrections`;
    notifyAdmin(
      "New outdated-info report",
      `A ${correction.contentType} was flagged as outdated:\n\n"${correction.note}"\n\nReview it: ${adminUrl}`
    );

    res.status(201).json(correction);
  } catch (err) {
    next(err);
  }
}

async function listAdmin(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const corrections = await Correction.find(filter).sort({ createdAt: -1 });
    res.json(corrections);
  } catch (err) {
    next(err);
  }
}

async function resolve(req, res, next) {
  try {
    const correction = await Correction.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );
    if (!correction) return res.status(404).json({ message: "Correction not found" });
    res.json(correction);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, listAdmin, resolve };
