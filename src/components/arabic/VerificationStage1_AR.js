import React from 'react';
export default function VerificationStage1_AR({ userData, onConfirm }) {
  return (
    <div>
      <h2>تأكيد البيانات</h2>
      <p>الاسم: {userData.fullName}</p>
      <p>الرقم الوطني: {userData.nid}</p>
      <p>رقم الجواز: {userData.idNumber}</p>
      <button onClick={onConfirm}>تأكيد المعلومات</button>
    </div>
  );
}