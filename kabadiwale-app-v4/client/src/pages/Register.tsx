import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [, navigate] = useLocation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);

  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");

  // simulate sending OTP to email
  const sendEmailOtp = () => {
    if (!email) {
      alert("Enter your email first");
      return;
    }
    // call your backend API here to send OTP
    setEmailOtpSent(true);
    alert(`OTP sent to email: ${email} (simulate)`);
  };

  // simulate sending OTP to mobile
  const sendMobileOtp = () => {
    if (!mobile) {
      alert("Enter your mobile number first");
      return;
    }
    // call your backend API here to send OTP
    setMobileOtpSent(true);
    alert(`OTP sent to mobile: ${mobile} (simulate)`);
  };

  // simulate verifying OTPs and registering
  const handleRegister = () => {
    // You should verify OTPs via backend before registering
    if (!emailOtpSent || !mobileOtpSent) {
      alert("Please verify email and mobile number with OTP");
      return;
    }
    if (emailOtp.length !== 6 || mobileOtp.length !== 6) {
      alert("Please enter valid 6-digit OTPs");
      return;
    }
    // call your backend register API here with fullName, email, mobile
    alert("Registered successfully! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Register</h2>

      <label className="block mb-2 font-semibold">Full Name</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Your full name"
      />

      <label className="block mb-2 font-semibold">Email</label>
      <div className="flex space-x-2 mb-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow p-2 border rounded"
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
            className="w-full mb-4 p-2 border rounded"
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
          className="flex-grow p-2 border rounded"
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
            className="w-full mb-4 p-2 border rounded"
            placeholder="6-digit OTP"
          />
        </>
      )}

      <Button onClick={handleRegister} className="w-full mt-4">
        Register
      </Button>
    </div>
  );
};

export default Register;
