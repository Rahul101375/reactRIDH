import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useLeafletContext } from '@react-leaflet/core';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';

window.L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

const center = [51.505, -0.09];

const createCustomIcon = (color) => new L.divIcon({
  className: 'custom-marker',
  iconSize: [32, 32], // Adjust the size as needed
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  html: `<div style="background-color: ${color};  height: 12px; width: 12px; border-radius: 50%;"></div>`
});

function Square(props) {
  const context = useLeafletContext();

  useEffect(() => {
    const bounds = L.latLngBounds(props.center, props.center);
    bounds.pad(props.size);
    const rectangle = L.rectangle(bounds);

    const container = context.layerContainer || context.map;
    container.addLayer(rectangle);

    return () => {
      container.removeLayer(rectangle);
    };
  }, [context.layerContainer, context.map, props.center, props.size]);

  return null;
}

export default function WordMapComponent() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const markerData = [
    { position: [51.505, -0.09], country: 'London' },
    { position: [52.505, -1.09], country: 'Paris' },
    // Add more marker data as needed
  ];

  const markerCounts = markerData.reduce((counts, marker) => {
    const country = marker.country;

    counts[country] = (counts[country] || 0) + 1;

    return counts;
  }, {});

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <h3 style={{ textAlign: 'left' }}>World Map</h3>
      <MapContainer center={center} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerData.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={createCustomIcon(selectedCountry === marker.country ? 'red' : 'green')}
            eventHandlers={{
              click: () => setSelectedCountry(marker.country)
            }}
          >
            <Tooltip>
              {marker.country}
            </Tooltip>
            <Popup>
              Country: {marker.country}
            </Popup>
          </Marker>
        ))}
        <Square center={center} size={0.1} />
      </MapContainer>

      <div>
        <h3>Marker Counts per Country:</h3>
        <ul>
          {Object.entries(markerCounts).map(([country, count]) => (
            <li key={country}>
              {country}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
