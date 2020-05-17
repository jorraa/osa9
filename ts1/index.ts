import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
//const express = require('express');
const app = express();

app.use(express.json()) 

app.get('/ping', (_req, res) => {
  res.send('pongi');
});

app.get('/bmi', (req, res) => {
  try {
    if(!req.query.height || req.query.weight) {
      throw new Error('parameter missing')
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    
      let error = isNaN(height)?`${req.query.height} is not number`:'';
      error = isNaN(weight)?`${error} ${req.query.weight} is not number`:error;

    if(error) {
      throw new Error(`malformed parameters: ${error}`);
    }

    res.send(bmiCalculator(height, weight));
  } catch(e) {
      res.status(400);
      res.send(e.message);
  }
})

app.post('/exercises', (request, response) => {
  const body = request.body
  try {
    if(!body.daily_exercises || !body.target) {
      throw new Error('parameters missing')
    }
    response.send(exerciseCalculator(body.daily_exercises, body.target))
  } catch(e) {
    response.status(400)
    response.send(e.message)
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});