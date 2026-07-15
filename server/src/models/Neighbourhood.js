const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema(
  { label: { type: String, required: true }, url: { type: String, required: true } },
  { _id: false }
);

const neighbourhoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    safetyRating: { type: Number, required: true, min: 1, max: 5 },
    costOfLiving: { type: String, required: true, enum: ["low", "medium", "high"] },
    transitAccess: { type: String, required: true },
    studentPopulation: { type: String, required: true },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    sources: { type: [sourceSchema], default: [] },
    lastVerified: { type: Date },
  },
  { timestamps: true }
);

neighbourhoodSchema.index({ name: "text", city: "text", description: "text" });

module.exports = mongoose.model("Neighbourhood", neighbourhoodSchema);
