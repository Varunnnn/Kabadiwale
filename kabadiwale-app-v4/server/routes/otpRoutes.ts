import express from "express";
import { storeOtp, verifyOtp } from "../utils/otpStore.ts";
import { sendEmailOtp } from "../utils/sendEmail";
import { sendSmsOtp } from "../utils/sendSms";


const router = express.Router();

// Send Email OTP
router.post("/send-email-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = generateOtp();
  saveOtp(email, otp);
  await sendEmailOtp(email, otp);

  res.json({ success: true, message: "OTP sent to email" });
});

// Send Mobile OTP
router.post("/send-mobile-otp", async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ error: "Mobile number is required" });

  const otp = generateOtp();
  saveOtp(mobile, otp);
  await sendSmsOtp(mobile, otp);

  res.json({ success: true, message: "OTP sent to mobile" });
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { key, otp } = req.body;
  if (!key || !otp) return res.status(400).json({ error: "Key and OTP are required" });

  const valid = verifyOtp(key, otp);
  res.json({ success: valid });
});

export default router;
