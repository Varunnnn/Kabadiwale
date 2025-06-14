// client/src/Register.tsx
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', {
        mobile_number: mobile,
        otp: otp,
      });
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error occurred');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <input
        type="text"
        placeholder="OTP (enter 123456)"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
