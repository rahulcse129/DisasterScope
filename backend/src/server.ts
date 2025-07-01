import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Configs
const NASA_API_KEY = '46adb874da314ba867424d8c952748b8';
const N2YO_API_KEY = 'SKHSPH-8JWAVD-2DSUMW-5IPN';

// === Wildfire Endpoint ===
app.get('/api/wildfire', async (req, res) => {
  const days = req.query.days || 1;
  const north = req.query.north || 22.0;
  const west = req.query.west || 72.0;
  const south = req.query.south || 20.0;
  const east = req.query.east || 74.0;

  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${NASA_API_KEY}/VIIRS_SNPP_NRT/world/${days}`;

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

app.get('/api/iss', async (req, res) => {
  const lat = req.query.lat || 21.18596;
  const lng = req.query.lng || 72.76407;
  const alt = req.query.alt || 17;
  const seconds = req.query.duration || 1;

  const url = `https://api.n2yo.com/rest/v1/satellite/positions/25544/${lat}/${lng}/${alt}/${seconds}?apiKey=${N2YO_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = (await response.json()) as ISSData; // ✅ Works
    res.json(data.positions?.[0] || {});
  } catch (err) {
    console.error('ISS API Error:', err);
    res.status(500).send('Error fetching ISS data.');
  }
});

app.get('/', (req, res) => {
  res.send('🚀 DisasterScope backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
