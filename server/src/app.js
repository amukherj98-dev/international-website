const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const guideRoutes = require("./routes/guides.routes");
const neighbourhoodRoutes = require("./routes/neighbourhoods.routes");
const submissionRoutes = require("./routes/submissions.routes");
const newsRoutes = require("./routes/news.routes");
const searchRoutes = require("./routes/search.routes");
const metaRoutes = require("./routes/meta.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const storiesRoutes = require("./routes/stories.routes");
const correctionsRoutes = require("./routes/corrections.routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/neighbourhoods", neighbourhoodRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/corrections", correctionsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
