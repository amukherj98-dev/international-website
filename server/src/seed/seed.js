require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const slugify = require("../utils/slugify");

const Admin = require("../models/Admin");
const Guide = require("../models/Guide");
const Neighbourhood = require("../models/Neighbourhood");
const Submission = require("../models/Submission");
const NewsArticle = require("../models/NewsArticle");
const Feedback = require("../models/Feedback");

const guidesData = require("./guidesData");
const neighbourhoodsData = require("./neighbourhoodsData");
const newsFallbackData = require("./newsFallbackData");
const submissionsData = require("./submissionsData");
const feedbackData = require("./feedbackData");

async function seedAdmin() {
  const email = (process.env.ADMIN_SEED_EMAIL || "admin@iestudents.local").toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ email, passwordHash, name: "Site Admin" });
  console.log(`Seeded admin account: ${email}`);
}

async function seedGuides() {
  await Guide.deleteMany({});
  const docs = guidesData.map((g) => ({ ...g, slug: slugify(g.title) }));
  await Guide.insertMany(docs);
  console.log(`Seeded ${docs.length} guide topics across 12 categories.`);
}

async function seedNeighbourhoods() {
  await Neighbourhood.deleteMany({});
  const docs = neighbourhoodsData.map((n) => ({ ...n, slug: slugify(`${n.name}-${n.city}`) }));
  await Neighbourhood.insertMany(docs);
  console.log(`Seeded ${docs.length} neighbourhoods.`);
}

async function seedNews() {
  const count = await NewsArticle.countDocuments();
  if (count > 0) {
    console.log(`NewsArticle collection already has ${count} docs - skipping fallback seed.`);
    return;
  }
  await NewsArticle.insertMany(newsFallbackData);
  console.log(`Seeded ${newsFallbackData.length} fallback news articles.`);
}

async function seedSubmissions() {
  const count = await Submission.countDocuments();
  if (count > 0) {
    console.log(`Submission collection already has ${count} docs - skipping sample seed.`);
    return;
  }
  await Submission.insertMany(submissionsData);
  console.log(`Seeded ${submissionsData.length} sample community submissions.`);
}

async function seedFeedback() {
  const count = await Feedback.countDocuments();
  if (count > 0) {
    console.log(`Feedback collection already has ${count} docs - skipping sample seed.`);
    return;
  }
  await Feedback.insertMany(feedbackData);
  console.log(`Seeded ${feedbackData.length} sample feedback entries.`);
}

async function run() {
  await connectDB();
  await seedAdmin();
  await seedGuides();
  await seedNeighbourhoods();
  await seedNews();
  await seedSubmissions();
  await seedFeedback();
  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
