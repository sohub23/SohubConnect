import React from 'react';

export function SeoMeta() {
  return (
    <>
      <title>SOHUB Connect - Borderless PBX for Bangladesh</title>
      <meta name="description" content="Modern PBX without phone numbers. Click-to-call buttons and QR-based calling for Bangladeshi businesses. Free forever plan." />
      <meta name="keywords" content="PBX, Bangladesh, Click-to-Call, QR Calling, Business Communication, Free PBX" />
      
      {/* Open Graph */}
      <meta property="og:title" content="SOHUB Connect - Borderless PBX for Bangladesh" />
      <meta property="og:description" content="Modern PBX without phone numbers. Click-to-call buttons and QR-based calling for Bangladeshi businesses. Free forever plan." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://connect.sohub.com.bd" />
      <meta property="og:image" content="https://connect.sohub.com.bd/images/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="SOHUB Connect" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="SOHUB Connect - Borderless PBX for Bangladesh" />
      <meta name="twitter:description" content="Modern PBX without phone numbers. Click-to-call buttons and QR-based calling for Bangladeshi businesses. Free forever plan." />
      <meta name="twitter:image" content="https://connect.sohub.com.bd/images/og-image.png" />
      <meta name="twitter:site" content="@sohub" />
      
      {/* Canonical */}
      <link rel="canonical" href="https://connect.sohub.com.bd" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#22C55E" />
    </>
  );
}
