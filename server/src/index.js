require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { startNewsScheduler } = require("./services/newsService");
const { startDriveSyncScheduler } = require("./services/driveSyncService");

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  startNewsScheduler();
  startDriveSyncScheduler();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
