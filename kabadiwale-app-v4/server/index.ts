import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import userRoutes from "./routes/userRoutes";
import otpRoutes from "./routes/otpRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Register API routes
  app.use("/api/user", userRoutes);
  app.use("/api/otp", otpRoutes);

  // Logout route
  app.post("/api/logout", (_req, res) => {
    // Clear session/token if any auth mechanism used
    res.status(200).json({ success: true });
  });

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite for dev or serve static in prod
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start server
  const port = 5001;
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`🚀 Server running on port ${port}`);
    }
  );
})();
