import React from 'react';

export default function HeroImage() {
  return (
    <>
      <div 
        className="absolute inset-0 z-0 opacity-60 mix-blend-overlay"
        style={{
          backgroundImage: `url('/hero-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-aurora-blue via-aurora-blue/60 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-aurora-blue via-aurora-blue/40 to-transparent z-0" />
    </>
  );
}
