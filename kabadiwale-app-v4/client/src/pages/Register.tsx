import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [, navigate] = useLocation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);

  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");

  const sendEmailOtp = () => {
    if (!email) {
      alert("Enter your email first");
      return;
    }
    setEmailOtpSent(true);
    alert(`OTP sent to email: ${email} (simulate)`);
  };

  const sendMobileOtp = () => {
    if (!mobile) {
      alert("Enter your mobile number first");
      return;
    }
    setMobileOtpSent(true);
    alert(`OTP sent to mobile: ${mobile} (simulate)`);
  };

  const handleRegister = async () => {
    if (!emailOtpSent || !mobileOtpSent) {
      alert("Please verify email and mobile number with OTP");
      return;
    }
    if (emailOtp.length !== 6 || mobileOtp.length !== 6) {
      alert("Please enter valid 6-digit OTPs");
      return;
    }
    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          mobile,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registered successfully! Redirecting to login...");
        navigate("/login");
      } else {
        alert(result?.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during registration.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Register</h2>

        <label className="block mb-2 font-semibold">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-4 p-2 border rounded font-semibold text-gray-900 dark:text-gray-900"
          placeholder="Your full name"
        />

        <label className="block mb-2 font-semibold">Email</label>
        <div className="flex space-x-2 mb-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow p-2 border rounded font-semibold text-gray-900 dark:text-gray-900"
            placeholder="Email address"
            disabled={emailOtpSent}
          />
          {!emailOtpSent && (
            <Button onClick={sendEmailOtp} className="whitespace-nowrap">Send OTP</Button>
          )}
        </div>

        {emailOtpSent && (
          <>
            <label className="block mb-2 font-semibold">Enter Email OTP</label>
            <input
              type="text"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              maxLength={6}
              className="w-full mb-4 p-2 border rounded font-semibold text-gray-900 dark:text-gray-900"
              placeholder="6-digit OTP"
            />
          </>
        )}

        <label className="block mb-2 font-semibold">Mobile Number</label>
        <div className="flex space-x-2 mb-2">
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="flex-grow p-2 border rounded font-semibold text-gray-900 dark:text-gray-900"
            placeholder="Mobile number"
            disabled={mobileOtpSent}
          />
          {!mobileOtpSent && (
            <Button onClick={sendMobileOtp} className="whitespace-nowrap">Send OTP</Button>
          )}
        </div>

        {mobileOtpSent && (
          <>
            <label className="block mb-2 font-semibold">Enter Mobile OTP</label>
            <input
              type="text"
              value={mobileOtp}
              onChange={(e) => setMobileOtp(e.target.value)}
              maxLength={6}
              className="w-full mb-4 p-2 border rounded font-semibold text-gray-900 dark:text-gray-900"
              placeholder="6-digit OTP"
            />
          </>
        )}

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded font-semibold text-gray-900 dark:text-gray-900"
          placeholder="Create a password"
        />

        <Button onClick={handleRegister} className="w-full mt-4">
          Register
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
