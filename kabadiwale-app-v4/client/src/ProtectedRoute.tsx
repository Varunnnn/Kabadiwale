import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/pages/Auth'; // however you manage auth

const PickupRequestButton = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <p>Please log in to raise a pickup request.</p>;
  }

  return <button onClick={() => {/* open pickup request form */}}>Raise Pickup Request</button>;
};



export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuth = localStorage.getItem('auth') === 'true';
  return isAuth ? children : <Navigate to="/auth" />;
}
