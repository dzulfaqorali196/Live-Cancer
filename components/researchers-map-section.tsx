"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Data lokasi peneliti
const researcherLocations = [
  {
    id: 1,
    name: "Dana-Farber Cancer Institute",
    country: "USA",
    coordinates: [42.3376, -71.1037] as [number, number],
    countryCode: "US"
  },
  {
    id: 2,
    name: "MD Anderson Cancer Center",
    country: "USA",
    coordinates: [29.7604, -95.3698] as [number, number],
    countryCode: "US"
  },
  {
    id: 3,
    name: "National Cancer Institute – NIH",
    country: "USA",
    coordinates: [39.0029, -77.1043] as [number, number],
    countryCode: "US"
  },
  {
    id: 4,
    name: "Memorial Sloan Kettering Cancer Center",
    country: "USA",
    coordinates: [40.7645, -73.9565] as [number, number],
    countryCode: "US"
  },
  {
    id: 5,
    name: "Cancer Research UK",
    country: "United Kingdom",
    coordinates: [51.5259, -0.1289] as [number, number],
    countryCode: "GB"
  },
  {
    id: 6,
    name: "German Cancer Research Center – DKFZ",
    country: "Germany",
    coordinates: [49.4142, 8.6750] as [number, number],
    countryCode: "DE"
  },
  {
    id: 7,
    name: "Institut Curie",
    country: "France",
    coordinates: [48.8453, 2.3434] as [number, number],
    countryCode: "FR"
  },
  {
    id: 8,
    name: "Peter MacCallum Cancer Centre",
    country: "Australia",
    coordinates: [-37.8136, 144.9631] as [number, number],
    countryCode: "AU"
  },
  {
    id: 9,
    name: "RIKEN Center for Integrative Medical Sciences",
    country: "Japan",
    coordinates: [35.2288, 139.1027] as [number, number],
    countryCode: "JP"
  },
  {
    id: 10,
    name: "A*STAR Institute of Molecular and Cell Biology",
    country: "Singapore",
    coordinates: [1.2956, 103.7877] as [number, number],
    countryCode: "SG"
  }
];

// Membuat set unik kode negara yang memiliki peneliti
const researcherCountryCodes = new Set(researcherLocations.map(location => location.countryCode));

// Kita menggunakan dynamic import untuk Leaflet karena ia bergantung pada window
const MapComponent = dynamic(() => import('./map/researcher-map'), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-transparent flex items-center justify-center">Loading Map...</div>
});

export function ResearchersMapSection() {
  return (
    <section className="py-12 md:py-20 lg:py-32 container relative">
      {/* Background effects */}
      <div className="absolute -bottom-32 md:-bottom-64 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-[#a857ff]/5 blur-[80px] md:blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute -top-32 md:-top-64 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-[#a857ff]/5 blur-[80px] md:blur-[150px] pointer-events-none z-0"></div>
      
      <div className="text-center max-w-5xl mx-auto mb-10 relative z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6 text-center">
          <span className="text-white">Global </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#E9D5FF]">
            Research Network
          </span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
          CencerCoin collaborates with leading cancer research institutions worldwide to develop breakthrough technologies and therapies.
        </p>
      </div>
      
      <div className="mt-10 rounded-xl overflow-hidden relative z-10" style={{ 
        background: 'rgba(25, 25, 25, 0.05)',
        backdropFilter: 'blur(5px)',
        boxShadow: 'inset 0 0 20px rgba(138, 61, 217, 0.15), 0 5px 25px rgba(0, 0, 0, 0.1), 0 0 30px rgba(168, 87, 255, 0.1)',
        border: '1px solid rgba(168, 87, 255, 0.15)',
        position: 'relative'
      }}>
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-30"
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 87, 255, 0.05) 0%, transparent 70%)',
          }}
        ></div>
        <MapComponent 
          researcherLocations={researcherLocations} 
          researcherCountryCodes={Array.from(researcherCountryCodes)} 
        />
      </div>
    </section>
  );
} 