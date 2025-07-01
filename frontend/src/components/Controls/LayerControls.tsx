import React from 'react';
import { Flame, Waves, Satellite, Clock } from 'lucide-react';
import { LayerState, TimeFilter } from '../../types';

interface LayerControlsProps {
  layers: LayerState;
  onLayerToggle: (layer: keyof LayerState) => void;
  timeFilter: number;
  onTimeFilterChange: (hours: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const timeFilters: TimeFilter[] = [
  { hours: 6, label: '6h' },
  { hours: 12, label: '12h' },
  { hours: 24, label: '24h' },
  { hours: 48, label: '48h' },
  { hours: 168, label: '7d' }
];

const LayerControls: React.FC<LayerControlsProps> = ({
  layers,
  onLayerToggle,
  timeFilter,
  onTimeFilterChange,
  isCollapsed,
  onToggleCollapse
}) => {
  return (
    <div className="absolute top-4 left-4 z-[1000]">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div 
          className="p-4 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between"
          onClick={onToggleCollapse}
        >
          <h2 className="text-white font-semibold text-lg">Disaster Layers</h2>
          <div className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Controls */}
        {!isCollapsed && (
          <div className="p-4 pt-0 space-y-4">
            {/* Layer toggles */}
            <div className="space-y-3">
              <div 
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-white/10 ${
                  layers.wildfires ? 'bg-red-500/20 border border-red-400/30' : 'bg-white/5'
                }`}
                onClick={() => onLayerToggle('wildfires')}
              >
                <Flame className={`w-5 h-5 ${layers.wildfires ? 'text-red-400' : 'text-gray-400'}`} />
                <span className="text-white font-medium">Wildfires</span>
                <div className={`ml-auto w-4 h-4 rounded border-2 ${
                  layers.wildfires ? 'bg-red-500 border-red-400' : 'border-gray-400'
                }`}>
                  {layers.wildfires && <div className="w-full h-full rounded bg-red-400"></div>}
                </div>
              </div>

              <div 
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-white/10 ${
                  layers.floods ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-white/5'
                }`}
                onClick={() => onLayerToggle('floods')}
              >
                <Waves className={`w-5 h-5 ${layers.floods ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className="text-white font-medium">Flood Zones</span>
                <div className={`ml-auto w-4 h-4 rounded border-2 ${
                  layers.floods ? 'bg-blue-500 border-blue-400' : 'border-gray-400'
                }`}>
                  {layers.floods && <div className="w-full h-full rounded bg-blue-400"></div>}
                </div>
              </div>

              <div 
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-white/10 ${
                  layers.satellites ? 'bg-yellow-500/20 border border-yellow-400/30' : 'bg-white/5'
                }`}
                onClick={() => onLayerToggle('satellites')}
              >
                <Satellite className={`w-5 h-5 ${layers.satellites ? 'text-yellow-400' : 'text-gray-400'}`} />
                <span className="text-white font-medium">ISS Tracker</span>
                <div className={`ml-auto w-4 h-4 rounded border-2 ${
                  layers.satellites ? 'bg-yellow-500 border-yellow-400' : 'border-gray-400'
                }`}>
                  {layers.satellites && <div className="w-full h-full rounded bg-yellow-400"></div>}
                </div>
              </div>
            </div>

            {/* Time filter */}
            {layers.wildfires && (
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-300" />
                  <span className="text-sm text-gray-300 font-medium">Time Range</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter.hours}
                      onClick={() => onTimeFilterChange(filter.hours)}
                      className={`px-2 py-1 text-xs rounded transition-all ${
                        timeFilter === filter.hours
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LayerControls;