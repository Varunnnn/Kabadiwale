// server/routes/userRoutes.ts

import express from "express";
import { db } from "../db"; // ✅ correct path to ds.ts
import { app_users } from "@shared/schema";
import { eq } from "drizzle-orm";


const router = express.Router();

router.post("/register", async (req, res) => {
  const { mobile_number, otp } = req.body;

  console.log("Incoming registration:", req.body);

  if (!mobile_number || !otp) {
    return res.status(400).json({ message: "Mobile number and OTP are required" });
  }

  try {
    // Check if user already exists
    const existing = await db
      .select()
      .from(app_users)
      .where(eq(app_users.mobile_number, mobile_number));

    if (existing.length > 0) {
      return res.status(409).json({ message: "Mobile number already registered" });
    }

    // Insert new user
    const result = await db
      .insert(app_users)
      .values({ mobile_number, otp })
      .returning();

    console.log("User inserted:", result);

    res.status(201).json({ message: "User registered successfully", user: result[0] });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
