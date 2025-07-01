import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Configs
const NASA_API_KEY = '46adb874da314ba867424d8c952748b8';
const N2YO_API_KEY = 'SKHSPH-8JWAVD-2DSUMW-5IPN';

// === Wildfire Endpoint ===
app.get('/api/wildfire', async (req: Request, res: Response) => {
  const days = parseInt(req.query.days as string) || 1;
  const north = parseFloat(req.query.north as string) || 22.0;
  const west = parseFloat(req.query.west as string) || 72.0;
  const south = parseFloat(req.query.south as string) || 20.0;
  const east = parseFloat(req.query.east as string) || 74.0;

  const area = `${north},${west},${south},${east}`;
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${NASA_API_KEY}/VIIRS_SNPP_NRT/${area}/${days}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.type('text/csv').send(text);
  } catch (err) {
    console.error('Wildfire API Error:', err);
    res.status(500).send('Error fetching wildfire data.');
  }
});

// === ISS Position Endpoint ===
interface ISSData {
  positions: {
    satlatitude: number;
    satlongitude: number;
    timestamp: number;
  }[];
}

app.get('/api/iss', async (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string) || 21.18596;
  const lng = parseFloat(req.query.lng as string) || 72.76407;
  const alt = parseFloat(req.query.alt as string) || 17;
  const seconds = parseInt(req.query.duration as string) || 1;

  const url = `https://api.n2yo.com/rest/v1/satellite/positions/25544/${lat}/${lng}/${alt}/${seconds}?apiKey=${N2YO_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = (await response.json()) as ISSData;
    res.json(data.positions?.[0] || {});
  } catch (err) {
    console.error('ISS API Error:', err);
    res.status(500).send('Error fetching ISS data.');
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 DisasterScope backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
