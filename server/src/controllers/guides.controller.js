const Guide = require("../models/Guide");
const slugify = require("../utils/slugify");

async function list(req, res, next) {
  try {
    const { category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };

    const guides = await Guide.find(filter).sort({ category: 1, order: 1, title: 1 });
    res.json(guides);
  } catch (err) {
    next(err);
  }
}

async function getBySlug(req, res, next) {
  try {
    const guide = await Guide.findOne({ slug: req.params.slug });
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json(guide);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const body = { ...req.body };
    if (!body.slug) body.slug = slugify(body.title || "");
    const guide = await Guide.create(body);
    res.status(201).json(guide);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json(guide);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getBySlug, create, update, remove };
