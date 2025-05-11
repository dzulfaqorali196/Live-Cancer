"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Interface untuk props
interface ResearcherLocation {
  id: number;
  name: string;
  country: string;
  coordinates: [number, number]; // [latitude, longitude]
  countryCode: string;
}

interface ResearcherMapProps {
  researcherLocations: ResearcherLocation[];
  researcherCountryCodes: string[];
}

// Custom purple marker
const purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Country codes with researchers
const RESEARCHER_COUNTRY_CODES = ['US', 'GB', 'DE', 'FR', 'AU', 'JP', 'SG'];

const ResearcherMap: React.FC<ResearcherMapProps> = ({ researcherLocations, researcherCountryCodes }) => {
  const [worldGeoJSON, setWorldGeoJSON] = useState<any>(null);

  useEffect(() => {
    // Fix Leaflet icon issue in Next.js
    // @ts-ignore - Leaflet has this property but it's not declared in the type
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
    
    // Load GeoJSON data from public API
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then(response => response.json())
      .then(data => {
        setWorldGeoJSON(data);
      })
      .catch(error => {
        console.error('Error loading GeoJSON:', error);
      });
      
    // Add custom CSS for transparent background
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .leaflet-container {
        background: transparent !important;
      }
      .leaflet-tile-pane {
        opacity: 0 !important; /* Completely hide the tile layer */
      }
      .leaflet-control-attribution {
        background-color: rgba(0,0,0,0.5) !important;
        color: rgba(255,255,255,0.7) !important;
      }
      .leaflet-control-zoom {
        background-color: rgba(0,0,0,0.5) !important;
        border: none !important;
      }
      .leaflet-control-zoom a {
        color: white !important;
        background-color: rgba(0,0,0,0.7) !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
      }
      .leaflet-control-zoom a:hover {
        background-color: rgba(80,80,80,0.7) !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Style for countries in GeoJSON
  const countryStyle = (feature: any) => {
    const countryCode = feature.properties.iso_a2;
    
    // If country has researchers, give it a stronger purple color
    if (RESEARCHER_COUNTRY_CODES.includes(countryCode)) {
      return {
        fillColor: '#9c27b0', // Stronger purple color
        weight: 2,
        opacity: 0.9,
        color: '#6a1b9a', // Darker purple border
        fillOpacity: 0.7,  // Higher opacity to stand out
        dashArray: ''
      };
    }
    
    // Default style for other countries
    return {
      fillColor: '#454545', // Dark grey fill for non-researcher countries
      weight: 1,
      opacity: 0.7,
      color: '#333333', // Darker border
      fillOpacity: 0.2,
      dashArray: '3'
    };
  };

  // Style for oceans - making them transparent
  const oceanStyle = {
    fill: true,
    fillColor: 'transparent',
    fillOpacity: 0,
    stroke: false
  };

  // Setup events when mouse enters country region
  const onEachFeature = (feature: any, layer: L.Layer) => {
    const countryCode = feature.properties.iso_a2;
    const isResearcherCountry = RESEARCHER_COUNTRY_CODES.includes(countryCode);
    
    // Create popup info showing researchers in the country
    let popupContent = `<strong>${feature.properties.name}</strong>`;
    
    if (isResearcherCountry) {
      popupContent += `<br/><span style="color: #9c27b0; font-weight: bold;">Research Institutions:</span>`;
      
      // Filter researchers by country
      const researchersInCountry = researcherLocations.filter(
        location => location.countryCode === countryCode
      );
      
      // Add list of research institutions to popup
      if (researchersInCountry.length > 0) {
        popupContent += '<ul style="margin: 5px 0 0 15px; padding: 0;">';
        researchersInCountry.forEach(researcher => {
          popupContent += `<li style="color: #9c27b0;">${researcher.name}</li>`;
        });
        popupContent += '</ul>';
      }
    }
    
    layer.bindPopup(popupContent);
    
    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          weight: 3,
          color: isResearcherCountry ? '#6a1b9a' : '#666',
          dashArray: '',
          fillOpacity: isResearcherCountry ? 0.9 : 0.5
        });
        target.bringToFront();
      },
      mouseout: (e) => {
        const target = e.target;
        const defaultStyle = isResearcherCountry ? {
          fillColor: '#9c27b0',
          weight: 2,
          opacity: 0.9,
          color: '#6a1b9a',
          fillOpacity: 0.7,
          dashArray: ''
        } : {
          fillColor: '#454545',
          weight: 1,
          opacity: 0.7,
          color: '#333333',
          fillOpacity: 0.2,
          dashArray: '3'
        };
        
        target.setStyle(defaultStyle);
      }
    });
  };

  return (
    <MapContainer 
      center={[20, 0]} 
      zoom={2} 
      style={{ height: '600px', width: '100%', background: 'transparent' }}
      minZoom={2}
      maxBounds={[[-90, -180], [90, 180]]}
      zoomControl={true}
      attributionControl={true}
      className="z-10 leaflet-transparent"
    >
      {/* We're not using the standard tile layer anymore */}
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity={0.5}
      /> */}
      
      {/* Render GeoJSON for countries */}
      {worldGeoJSON && (
        <GeoJSON 
          data={worldGeoJSON} 
          style={countryStyle}
          onEachFeature={onEachFeature}
        />
      )}
      
      {/* Render markers for each researcher location */}
      {researcherLocations.map((location) => (
        <Marker 
          key={location.id} 
          position={location.coordinates}
          icon={purpleIcon}
        >
          <Popup>
            <div>
              <h3 className="font-medium">{location.name}</h3>
              <p>{location.country}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ResearcherMap; 