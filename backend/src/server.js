import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/ingest.js";
import { serve } from "inngest/express";

const app = express();
app.use(clerkMiddleware());
app.use(express.json());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV === "Production") {
      app.listen(ENV.PORT, () => {
        console.log(
          `Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`
        );
      });
    }
  } catch (error) {
    console.log("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

// Export for Vercel
export default (req, res) => {
  return app(req, res);
};