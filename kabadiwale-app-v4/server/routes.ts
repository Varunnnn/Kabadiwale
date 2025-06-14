import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, updateBookingSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { NotificationService } from "./notifications";
import nodemailer from "nodemailer" ;
import crypto from "crypto";
import session from "express-session";

// Store OTPs temporarily
const otpStore: { [email: string]: string } = {};

// Setup mailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'help.kabadiwale@gmail.com',           // replace with your email
    pass: 'Kabadiwale@123',              // replace with app password
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Add session middleware
  app.use(session({
    secret: "kabadiwale-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // use true if HTTPS
  }));

  // Middleware to protect routes
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // AUTH ROUTES -----------------------------------------

  app.post("/api/send-otp", async (req, res) => {
    const { identifier } = req.body;

    if (!identifier || !identifier.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[identifier] = otp;

    try {
      await transporter.sendMail({
        from: "Kabadiwale <help.kabadiwale@gmail.com>",
        to: identifier,
        subject: "Your OTP",
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to send OTP:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  });

  app.post("/api/verify-otp", (req, res) => {
    const { identifier, otp } = req.body;

    if (otpStore[identifier] === otp) {
      delete otpStore[identifier];
      req.session.user = identifier;
      res.json({ success: true });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/me", (req, res) => {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ user: null });
    }
  });

  // USER PROFILE & PICKUP REQUEST ROUTES (protected) -------------

  // GET /api/user/profile — get logged-in user profile
  app.get("/api/user/profile", requireAuth, async (req, res) => {
    try {
      const email = req.session.user;
      const userProfile = await storage.getUserProfile(email);
      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      res.json(userProfile);
    } catch (error) {
      console.error("Failed to get user profile:", error);
      res.status(500).json({ message: "Failed to get user profile" });
    }
  });

  // PUT /api/user/profile — update user profile
  app.put("/api/user/profile", requireAuth, async (req, res) => {
    try {
      const email = req.session.user;
      const updateData = req.body; // expect relevant profile fields
      const updatedProfile = await storage.updateUserProfile(email, updateData);
      if (!updatedProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      res.json({ message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
      console.error("Failed to update user profile:", error);
      res.status(500).json({ message: "Failed to update user profile" });
    }
  });

  // GET /api/user/pickup-history — get user's past pickup requests
  app.get("/api/user/pickup-history", requireAuth, async (req, res) => {
    try {
      const email = req.session.user;
      const history = await storage.getPickupHistory(email);
      res.json(history);
    } catch (error) {
      console.error("Failed to get pickup history:", error);
      res.status(500).json({ message: "Failed to get pickup history" });
    }
  });

  // POST /api/pickup-request — raise new pickup request
  app.post("/api/pickup-request", requireAuth, async (req, res) => {
    try {
      const email = req.session.user;
      const pickupDetails = req.body.pickupDetails;
      if (!pickupDetails) {
        return res.status(400).json({ message: "Pickup details required" });
      }
      const newRequest = await storage.createPickupRequest(email, pickupDetails);
      res.status(201).json({ message: "Pickup request created", pickupRequest: newRequest });
    } catch (error) {
      console.error("Failed to create pickup request:", error);
      res.status(500).json({ message: "Failed to create pickup request" });
    }
  });

  // BOOKING ROUTES (protected) ---------------------------

  app.get("/api/bookings", requireAuth, async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve bookings" });
    }
  });

  app.get("/api/bookings/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid booking ID" });
      }

      const booking = await storage.getBooking(id);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve booking" });
    }
  });

  app.post("/api/bookings", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);

      await NotificationService.sendBookingConfirmation(booking);

      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Booking creation error:", error);
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.patch("/api/bookings/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid booking ID" });
      }

      const validatedData = updateBookingSchema.parse(req.body);
      const booking = await storage.updateBooking(id, validatedData);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      await NotificationService.sendStatusUpdateNotification(booking);

      res.json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Booking update error:", error);
        res.status(500).json({ message: "Failed to update booking" });
      }
    }
  });

  app.delete("/api/bookings/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid booking ID" });
      }

      const booking = await storage.getBooking(id);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      const success = await storage.deleteBooking(id);

      if (!success) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.status(204).end();
    } catch (error) {
      console.error("Booking deletion error:", error);
      res.status(500).json({ message: "Failed to delete booking" });
    }
  });

  // Start server
  const httpServer = createServer(app);
  return httpServer;
}
