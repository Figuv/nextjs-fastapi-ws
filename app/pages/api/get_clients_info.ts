'use client';

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('http://192.168.1.10:8000/get_clients_info');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching clients info:', error);
    res.status(500).json({ error: 'Error fetching clients info' });
  }
}
