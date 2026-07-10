const Neighbourhood = require("../models/Neighbourhood");
const slugify = require("../utils/slugify");

async function list(req, res, next) {
  try {
    const { q, sort, city } = req.query;
    const filter = {};
    if (city) filter.city = city;
    if (q) filter.$text = { $search: q };

    let query = Neighbourhood.find(filter);
    if (sort === "safety") query = query.sort({ safetyRating: -1 });
    else if (sort === "cost") query = query.sort({ costOfLiving: 1 });
    else query = query.sort({ name: 1 });

    res.json(await query);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const neighbourhood = await Neighbourhood.findOne({
      $or: [{ slug: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });
    if (!neighbourhood) return res.status(404).json({ message: "Neighbourhood not found" });
    res.json(neighbourhood);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const body = { ...req.body };
    if (!body.slug) body.slug = slugify(`${body.name}-${body.city}`);
    const neighbourhood = await Neighbourhood.create(body);
    res.status(201).json(neighbourhood);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const neighbourhood = await Neighbourhood.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!neighbourhood) return res.status(404).json({ message: "Neighbourhood not found" });
    res.json(neighbourhood);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const neighbourhood = await Neighbourhood.findByIdAndDelete(req.params.id);
    if (!neighbourhood) return res.status(404).json({ message: "Neighbourhood not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, update, remove };
