const Story = require("../models/Story");

async function listPublic(req, res, next) {
  try {
    const { displayMode, theme } = req.query;
    const filter = { status: "published" };
    if (displayMode) filter.displayMode = displayMode;
    if (theme) filter.themes = theme;
    const stories = await Story.find(filter).sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const story = await Story.findOne({ _id: req.params.id, status: "published" });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (err) {
    next(err);
  }
}

async function listAdmin(req, res, next) {
  try {
    const stories = await Story.find({}).sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const story = await Story.create(req.body);
    res.status(201).json(story);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { listPublic, getById, listAdmin, create, update, remove };
