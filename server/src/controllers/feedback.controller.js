const { validationResult } = require("express-validator");
const Feedback = require("../models/Feedback");

async function listPublic(req, res, next) {
  try {
    const feedback = await Feedback.find({ status: "approved" }).sort({ createdAt: -1 }).limit(60);
    res.json(feedback);
  } catch (err) {
    next(err);
  }
}

async function listAdmin(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const feedback = await Feedback.find(filter).sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid feedback", errors: errors.array() });
    }
    const { name, message } = req.body;
    const feedback = await Feedback.create({
      name: name?.trim() || "Anonymous",
      message: message.trim(),
      status: "pending",
    });
    res.status(201).json(feedback);
  } catch (err) {
    next(err);
  }
}

async function approve(req, res, next) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
}

async function reject(req, res, next) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { listPublic, listAdmin, create, approve, reject, remove };
