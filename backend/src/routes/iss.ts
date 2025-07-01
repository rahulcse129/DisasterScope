import express from 'express';
import fetch from 'node-fetch';
import { ISSData } from '../types';

const router = express.Router();

const N2YO_API_KEY = 'SKHSPH-8JWAVD-2DSUMW-5IPN';

router.get('/', async (req, res) => {
  const lat = req.query.lat || 21.18596;
  const lng = req.query.lng || 72.76407;
  const alt = req.query.alt || 17;
  const duration = req.query.duration || 1;

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
