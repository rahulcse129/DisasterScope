import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import { ISSData } from '../types';

const router = express.Router();
const N2YO_API_KEY = 'SKHSPH-8JWAVD-2DSUMW-5IPN';

router.get('/', async (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string) || 21.18596;
  const lng = parseFloat(req.query.lng as string) || 72.76407;
  const alt = parseFloat(req.query.alt as string) || 17;
  const duration = parseInt(req.query.duration as string) || 1;

  const url = `https://api.n2yo.com/rest/v1/satellite/positions/25544/${lat}/${lng}/${alt}/${duration}?apiKey=${N2YO_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = (await response.json()) as ISSData;
    res.json(data.positions?.[0] || {});
  } catch (error) {
    console.error('ISS API error:', error);
    res.status(500).send('Error fetching ISS position.');
  }
});

export const issRouter = router;
