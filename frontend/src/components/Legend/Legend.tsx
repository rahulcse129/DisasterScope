import React from 'react';
import { Flame, Waves, Satellite, Info } from 'lucide-react';
import { LayerState } from '../../types';

interface LegendProps {
  layers: LayerState;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Legend: React.FC<LegendProps> = ({ layers, isCollapsed, onToggleCollapse }) => {
  const hasActiveLayers = Object.values(layers).some(layer => layer);

  if (!hasActiveLayers) return null;

  return (
    <div className="absolute bottom-4 right-4 z-[1000]">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden max-w-xs">
        {/* Header */}
        <div 
          className="p-4 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between"
          onClick={onToggleCollapse}
        >
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">Legend</h3>
          </div>
          <div className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Legend content */}
        {!isCollapsed && (
          <div className="p-4 pt-0 space-y-3">
            {layers.wildfires && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-400" />
                  <span className="text-white text-sm font-medium">Wildfire Activity</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Active fire detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-xs text-gray-300">High intensity fire</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Data from NASA FIRMS VIIRS satellite
                  </p>
                </div>
              </div>
            )}

            {layers.floods && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm font-medium">Flood Zones</span>
                </div>
                <div className="ml-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Flood risk areas</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Copernicus flood monitoring data
                  </p>
                </div>
              </div>
            )}

            {layers.satellites && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm font-medium">Satellite Tracking</span>
                </div>
                <div className="ml-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">International Space Station</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Live position updated every 5 seconds
                  </p>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-white/10">
              <p className="text-xs text-gray-400">
                Click on markers for detailed information
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Legend;