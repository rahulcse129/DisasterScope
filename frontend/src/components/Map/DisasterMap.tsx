import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet';
import { LatLngTuple, Icon } from 'leaflet';
import { FireData, ISSPosition, LayerState } from '../../types';
import { fetchWildfireData, fetchISSPosition } from '../../services/api';

interface DisasterMapProps {
  layers: LayerState;
  timeFilter: number;
}

// Create custom icons
const createFireIcon = (intensity: number) => {
  const size = Math.max(8, Math.min(20, intensity / 20));
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">
        <circle cx="12" cy="12" r="10" fill="#EF4444" opacity="0.8"/>
        <circle cx="12" cy="12" r="6" fill="#DC2626" opacity="0.9"/>
        <circle cx="12" cy="12" r="3" fill="#FBBF24"/>
      </svg>
    `)}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

const createSatelliteIcon = () => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="12" r="8" fill="#F59E0B" opacity="0.9"/>
        <circle cx="12" cy="12" r="4" fill="#FCD34D"/>
        <path d="M8 8l8 8M16 8l-8 8" stroke="#1F2937" stroke-width="1"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const DisasterMap: React.FC<DisasterMapProps> = ({ layers, timeFilter }) => {
  const [fireData, setFireData] = useState<FireData[]>([]);
  const [issPosition, setISSPosition] = useState<ISSPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      if (layers.wildfires) {
        const fires = await fetchWildfireData(timeFilter);
        setFireData(fires);
      }
      
      if (layers.satellites) {
        const iss = await fetchISSPosition();
        setISSPosition(iss);
      }
      
      setIsLoading(false);
    };

    loadData();
    
    // Update ISS position every 5 seconds when satellite layer is active
    let issInterval: NodeJS.Timeout;
    if (layers.satellites) {
      issInterval = setInterval(async () => {
        const iss = await fetchISSPosition();
        setISSPosition(iss);
      }, 5000);
    }

    return () => {
      if (issInterval) clearInterval(issInterval);
    };
  }, [layers, timeFilter]);

  const center: LatLngTuple = [20, 0]; // Centered on equator

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={center}
        zoom={2}
        className="w-full h-full"
        zoomControl={false}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="filter brightness-75 contrast-125"
        />
        
        {/* Wildfire markers */}
        {layers.wildfires && fireData.map((fire, index) => (
          <Marker
            key={`fire-${index}`}
            position={[fire.latitude, fire.longitude]}
            icon={createFireIcon(fire.brightness)}
          >
            <Popup className="fire-popup">
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">Wildfire Detected</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Location:</strong> {fire.latitude.toFixed(4)}, {fire.longitude.toFixed(4)}</p>
                  <p><strong>Brightness:</strong> {fire.brightness.toFixed(1)}K</p>
                  <p><strong>Confidence:</strong> {fire.confidence}%</p>
                  <p><strong>Date:</strong> {fire.acq_date} {fire.acq_time}</p>
                  <p><strong>Satellite:</strong> VIIRS {fire.satellite}</p>
                  {fire.frp > 0 && <p><strong>Fire Power:</strong> {fire.frp.toFixed(1)} MW</p>}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* ISS position */}
        {layers.satellites && issPosition && (
          <Marker
            position={[parseFloat(issPosition.latitude), parseFloat(issPosition.longitude)]}
            icon={createSatelliteIcon()}
          >
            <Popup className="satellite-popup">
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">International Space Station</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Latitude:</strong> {parseFloat(issPosition.latitude).toFixed(4)}°</p>
                  <p><strong>Longitude:</strong> {parseFloat(issPosition.longitude).toFixed(4)}°</p>
                  <p><strong>Last Update:</strong> {new Date(issPosition.timestamp * 1000).toLocaleTimeString()}</p>
                  <p><strong>Altitude:</strong> ~408 km</p>
                  <p><strong>Speed:</strong> ~27,600 km/h</p>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[1000]">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white font-medium">Loading disaster data...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterMap;