import { FireData, ISSPosition } from '../types';

// fetchWildfireData
export const fetchWildfireData = async (hours: number = 24): Promise<FireData[]> => {
  try {
    const res = await fetch(`/api/wildfire?days=${hours <= 24 ? 1 : hours >= 168 ? 7 : 3}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const csvText = await res.text();
    return parseFireDataCSV(csvText); // keep your parsing logic here
  } catch (error) {
    console.error('Error fetching wildfire data:', error);
    return generateMockFireData(); // fallback
  }
};

// fetchISSPosition
export const fetchISSPosition = async (): Promise<ISSPosition | null> => {
  try {
    const res = await fetch('/api/iss');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    return {
      latitude: data.satlatitude.toString(),
      longitude: data.satlongitude.toString(),
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error('Error fetching ISS data:', error);
    return {
      latitude: (Math.random() * 180 - 90).toFixed(5),
      longitude: (Math.random() * 360 - 180).toFixed(5),
      timestamp: Math.floor(Date.now() / 1000)
    };
  }
};


const parseFireDataCSV = (csvText: string): FireData[] => {
  const lines = csvText.split('\n');
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',');
      return {
        latitude: parseFloat(values[0]),
        longitude: parseFloat(values[1]),
        brightness: parseFloat(values[2]),
        scan: parseFloat(values[3]),
        track: parseFloat(values[4]),
        acq_date: values[5],
        acq_time: values[6],
        satellite: values[7],
        confidence: parseFloat(values[8]),
        version: values[9],
        bright_t31: parseFloat(values[10]),
        frp: parseFloat(values[11]),
        daynight: values[12]
      };
    })
    .filter(fire => !isNaN(fire.latitude) && !isNaN(fire.longitude));
};

const generateMockFireData = (): FireData[] => [
  {
    latitude: 21.17,
    longitude: 72.79,
    brightness: 325.6,
    scan: 1.0,
    track: 1.0,
    acq_date: '2024-01-15',
    acq_time: '1200',
    satellite: 'N',
    confidence: 90,
    version: '6.2NRT',
    bright_t31: 290.1,
    frp: 14.5,
    daynight: 'D'
  }
];
