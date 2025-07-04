// src/components/arabic/VerificationStage2_AR.js
import React, { useState } from 'react';
export default function VerificationStage2_AR({ onVerify }) {
  const [otp, setOtp] = useState('');
  const handleSubmit = () => {
    if (otp === '1234') onVerify();
    else alert('رمز التحقق غير صحيح');
  };
  return (
    <div>
      <h2>التحقق عبر OTP</h2>
      <p>تم إرسال الرمز: 1234</p>
      <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="أدخل الرمز" />
      <button onClick={handleSubmit}>تحقق</button>
    </div>
  );
}