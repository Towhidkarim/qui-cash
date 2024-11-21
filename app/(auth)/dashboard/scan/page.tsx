import React from 'react';
import ScannerSection from './scanner-section';

export default function Page() {
  return (
    <div>
      <h1 className='text-2xl font-semibold'>Scan QR code to pay</h1>
      <br />
      <ScannerSection />
    </div>
  );
}
