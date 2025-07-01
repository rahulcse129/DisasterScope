import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const NASA_API_KEY = '46adb874da314ba867424d8c952748b8';

router.get('/', async (req: Request, res: Response) => {
  const days = parseInt(req.query.days as string) || 1;
  const north = parseFloat(req.query.north as string) || 22.0;
  const west = parseFloat(req.query.west as string) || 72.0;
  const south = parseFloat(req.query.south as string) || 20.0;
  const east = parseFloat(req.query.east as string) || 74.0;

  const area = `${north},${west},${south},${east}`;
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${NASA_API_KEY}/VIIRS_SNPP_NRT/${area}/${days}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.type('text/csv').send(data);
  } catch (error) {
    console.error('Wildfire API error:', error);
    res.status(500).send('Error fetching wildfire data.');
  }
});

export const wildfireRouter = router;
