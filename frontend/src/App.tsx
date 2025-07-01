import React, { useState, useEffect } from 'react';
import DisasterMap from './components/Map/DisasterMap';
import LayerControls from './components/Controls/LayerControls';
import Legend from './components/Legend/Legend';
import Header from './components/Header/Header';
import StatsPanel from './components/Stats/StatsPanel';
import { LayerState, FireData, ISSPosition } from './types';
import { fetchWildfireData, fetchISSPosition } from './services/api';

function App() {
  const [layers, setLayers] = useState<LayerState>({
    wildfires: true,
    floods: false,
    satellites: true
  });
  
  const [timeFilter, setTimeFilter] = useState<number>(24);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [legendCollapsed, setLegendCollapsed] = useState(false);
  const [statsCollapsed, setStatsCollapsed] = useState(false);
  
  // Data for stats panel
  const [fireData, setFireData] = useState<FireData[]>([]);
  const [issPosition, setISSPosition] = useState<ISSPosition | null>(null);

  const handleLayerToggle = (layer: keyof LayerState) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const handleTimeFilterChange = (hours: number) => {
    setTimeFilter(hours);
  };

  // Update stats data when relevant layers change
  useEffect(() => {
    const updateStats = async () => {
      if (layers.wildfires) {
        const fires = await fetchWildfireData(timeFilter);
        setFireData(fires);
      } else {
        setFireData([]);
      }
      
      if (layers.satellites) {
        const iss = await fetchISSPosition();
        setISSPosition(iss);
      } else {
        setISSPosition(null);
      }
    };

    updateStats();
  }, [layers.wildfires, layers.satellites, timeFilter]);

  return (
    <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Map */}
      <DisasterMap 
        layers={layers} 
        timeFilter={timeFilter} 
      />
      
      {/* Layer Controls */}
      <LayerControls
        layers={layers}
        onLayerToggle={handleLayerToggle}
        timeFilter={timeFilter}
        onTimeFilterChange={handleTimeFilterChange}
        isCollapsed={controlsCollapsed}
        onToggleCollapse={() => setControlsCollapsed(!controlsCollapsed)}
      />
      
      {/* Legend */}
      <Legend
        layers={layers}
        isCollapsed={legendCollapsed}
        onToggleCollapse={() => setLegendCollapsed(!legendCollapsed)}
      />
      
      {/* Stats Panel */}
      <StatsPanel
        fireData={fireData}
        issPosition={issPosition}
        isCollapsed={statsCollapsed}
        onToggleCollapse={() => setStatsCollapsed(!statsCollapsed)}
      />
      
      {/* Custom styles for map popups */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95);
        }
        
        .fire-popup .leaflet-popup-content-wrapper {
          border-left: 4px solid #EF4444;
        }
        
        .satellite-popup .leaflet-popup-content-wrapper {
          border-left: 4px solid #F59E0B;
        }
        
        .leaflet-control-zoom {
          position: absolute;
          top: 100px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .leaflet-control-zoom a {
          background: transparent;
          color: white;
          border: none;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.2s;
        }
        
        .leaflet-control-zoom a:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        @media (max-width: 768px) {
          .leaflet-control-zoom {
            top: 120px;
            right: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;