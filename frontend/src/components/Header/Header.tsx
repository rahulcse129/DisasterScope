import React from 'react';
import { Globe, Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-[1000] bg-gradient-to-b from-gray-900/80 to-transparent">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg border border-red-400/30">
              <Globe className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">DisasterScope</h1>
              <p className="text-sm text-gray-300">Real-time disaster monitoring worldwide</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-400/30">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium">Live Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;