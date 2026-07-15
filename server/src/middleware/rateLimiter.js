const rateLimit = require("express-rate-limit");

// Public submission endpoint: prevent spam without blocking legitimate use.
const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many submissions from this address. Please try again later." },
});

// Public feedback endpoint: short messages, but still worth capping abuse.
const feedbackLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too much feedback from this address. Please try again later." },
});

// Public correction-report endpoint: short reports, cap abuse the same way.
const correctionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many reports from this address. Please try again later." },
});

module.exports = { submissionLimiter, feedbackLimiter, correctionLimiter };
