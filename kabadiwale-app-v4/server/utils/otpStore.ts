// server/utils/otpStore.ts

// Static OTP for testing without real mobile verification
const STATIC_OTP = "123456";

export function storeOtp(identifier: string, otp: string, ttlSeconds = 300) {
  // For static OTP, we can ignore storing anything
  console.log(`Mock storeOtp called for ${identifier} with OTP ${STATIC_OTP}`);
}

export function verifyOtp(identifier: string, otp: string): boolean {
  // Always accept the static OTP and ignore expiration logic
  return otp === STATIC_OTP;
}
