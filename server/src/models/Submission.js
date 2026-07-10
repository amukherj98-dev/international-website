const mongoose = require("mongoose");
const { SUBMISSION_CATEGORY_SLUGS } = require("../constants/categories");

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "Anonymous" },
    email: { type: String, trim: true, lowercase: true },
    category: { type: String, required: true, enum: SUBMISSION_CATEGORY_SLUGS },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

submissionSchema.index({ title: "text", body: "text" });

module.exports = mongoose.model("Submission", submissionSchema);
