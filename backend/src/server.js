import "../instrument.mjs";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/ingest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";

const app = express();
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use(express.json());

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV === "Development") {
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
