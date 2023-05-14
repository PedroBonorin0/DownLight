import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express();
const prisma = new PrismaClient();

// Home
router.get('/', (req, res) => {
  res.send('route');
});

// Services
router.post('/services', async (req, res) => {
  const { name, price } = req.body;

  const service = {
    name,
    price
  };

  try {
    const response = await prisma.service.create({ data: service });
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.message || 'Unable to create Service');
  }  
});

router.get('/services', async (req, res) => {
  try {
    const response = await prisma.service.findMany();
    response.forEach((res) => {
      res.price = Number(res.price);
    });
    
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.message || 'Unable to list Services');
  }  
});

export default router;