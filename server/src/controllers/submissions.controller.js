const { validationResult } = require("express-validator");
const Submission = require("../models/Submission");
const { notifyAdmin } = require("../services/emailService");

async function listPublic(req, res, next) {
  try {
    const { category, q } = req.query;
    const filter = { status: "approved" };
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };
    const submissions = await Submission.find(filter).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    next(err);
  }
}

async function listAdmin(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const submissions = await Submission.find(filter).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid submission", errors: errors.array() });
    }

    const { name, email, category, title, body } = req.body;
    const submission = await Submission.create({
      name: name?.trim() || "Anonymous",
      email: email?.trim(),
      category,
      title: title.trim(),
      body: body.trim(),
      status: "pending",
    });

    const adminUrl = `${process.env.PUBLIC_APP_URL || ""}/admin/submissions`;
    notifyAdmin(
      "New community story pending approval",
      `${submission.name} submitted "${submission.title}" (${submission.category}):\n\n${submission.body}\n\nReview it: ${adminUrl}`
    );

    res.status(201).json(submission);
  } catch (err) {
    next(err);
  }
}

async function approve(req, res, next) {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json(submission);
  } catch (err) {
    next(err);
  }
}

async function reject(req, res, next) {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", adminNotes: req.body.adminNotes || "" },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json(submission);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { title, body, category, adminNotes, status } = req.body;
    const patch = {};
    if (title !== undefined) patch.title = title;
    if (body !== undefined) patch.body = body;
    if (category !== undefined) patch.category = category;
    if (adminNotes !== undefined) patch.adminNotes = adminNotes;
    if (status !== undefined) patch.status = status;

    const submission = await Submission.findByIdAndUpdate(req.params.id, patch, {
      new: true,
      runValidators: true,
    });
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json(submission);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { listPublic, listAdmin, create, approve, reject, update, remove };
