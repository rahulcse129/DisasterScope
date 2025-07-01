export interface FireData {
  latitude: number;
  longitude: number;
  brightness: number;
  scan: number;
  track: number;
  acq_date: string;
  acq_time: string;
  satellite: string;
  confidence: number;
  version: string;
  bright_t31: number;
  frp: number;
  daynight: string;
}

export interface ISSPosition {
  latitude: string;
  longitude: string;
  timestamp: number;
}

export interface LayerState {
  wildfires: boolean;
  floods: boolean;
  satellites: boolean;
}

export interface TimeFilter {
  hours: number;
  label: string;
}