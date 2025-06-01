import React, { useEffect, useState } from 'react';
import { useAuth } from "@/hooks/useAuth";


interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  address: string;
}

interface PickupRequest {
  id: string;
  date: string;
  status: string;
  // add other relevant fields
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });

  const [pickupHistory, setPickupHistory] = useState<PickupRequest[]>([]);

  useEffect(() => {
    // Fetch user profile data from your backend API
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(console.error);

    // Fetch user's pickup history
    fetch('/api/user/pickup-history')
      .then(res => res.json())
      .then(data => setPickupHistory(data))
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API to update user profile
    fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => alert('Profile updated successfully!'))
      .catch(console.error);
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={user.name} onChange={handleChange} required />

        <label>Email:</label>
        <input name="email" type="email" value={user.email} onChange={handleChange} required />

        <label>Mobile:</label>
        <input name="mobile" value={user.mobile} onChange={handleChange} required />

        <label>Address:</label>
        <textarea name="address" value={user.address} onChange={handleChange} />

        <button type="submit">Update Profile</button>
      </form>

      <h2>Pickup Request History</h2>
      <ul>
        {pickupHistory.map(pickup => (
          <li key={pickup.id}>
            {pickup.date} - {pickup.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
