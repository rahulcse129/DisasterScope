import React from 'react';
import { TrendingUp, MapPin, Clock } from 'lucide-react';
import { FireData, ISSPosition } from '../../types';

interface StatsPanelProps {
  fireData: FireData[];
  issPosition: ISSPosition | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ 
  fireData, 
  issPosition, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const highConfidenceFires = fireData.filter(fire => fire.confidence >= 80).length;
  const avgBrightness = fireData.length > 0 
    ? fireData.reduce((sum, fire) => sum + fire.brightness, 0) / fireData.length 
    : 0;

  return (
    <div className="absolute bottom-4 left-4 z-[1000]">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div 
          className="p-4 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between"
          onClick={onToggleCollapse}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">Live Statistics</h3>
          </div>
          <div className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Stats content */}
        {!isCollapsed && (
          <div className="p-4 pt-0 space-y-4">
            {fireData.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-red-400 font-medium text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Wildfire Activity
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">{fireData.length}</div>
                    <div className="text-xs text-gray-300">Active Fires</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">{highConfidenceFires}</div>
                    <div className="text-xs text-gray-300">High Confidence</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-lg font-bold text-orange-400">{avgBrightness.toFixed(1)}K</div>
                  <div className="text-xs text-gray-300">Average Brightness Temperature</div>
                </div>
              </div>
            )}

            {issPosition && (
              <div className="space-y-3 pt-3 border-t border-white/10">
                <h4 className="text-yellow-400 font-medium text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  ISS Position
                </h4>
                <div className="bg-white/5 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-300">
                      {parseFloat(issPosition.latitude).toFixed(2)}°, {parseFloat(issPosition.longitude).toFixed(2)}°
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-300">
                      Updated: {new Date(issPosition.timestamp * 1000).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-white/10">
              <p className="text-xs text-gray-400">
                Data refreshes automatically
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPanel;