// server/routes/authRoutes.ts
import express from 'express';
import pool from '../db';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { mobile_number, otp } = req.body;
  const staticOtp = process.env.STATIC_OTP;

  if (otp !== staticOtp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  try {
    const existingUser = await pool.query(
      'SELECT * FROM app_users WHERE mobile_number = $1',
      [mobile_number]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const newUser = await pool.query(
      'INSERT INTO app_users (mobile_number) VALUES ($1) RETURNING *',
      [mobile_number]
    );

    res.status(201).json({ message: 'User registered', user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
