import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'send' | 'verify'>('send');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email }),
    });

    const data = await res.json();
    if (data.success) {
      setStep('verify');
      setMessage('OTP sent to your email.');
    } else {
      setMessage(data.message || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, otp }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem('auth', 'true');
      navigate('/');
    } else {
      setMessage(data.message || 'Invalid OTP');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          {step === 'send' ? 'Login / Register' : 'Verify OTP'}
        </h2>
        {step === 'send' ? (
          <>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Verify OTP
            </button>
          </>
        )}
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

// Add this hook at the end of the file and export it (named export)
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    const auth = localStorage.getItem('auth');
    setIsAuthenticated(auth === 'true');
  }, []);

  return { isAuthenticated };
}
