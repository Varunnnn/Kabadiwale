import nodemailer from "nodemailer";

export async function sendEmailOtp(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"Kabadiwale" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Email OTP",
    text: `Your OTP is: ${otp}`,
  });
}
