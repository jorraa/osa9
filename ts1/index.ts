import express from 'express';
import { bmiCalculator } from './bmiCalculator';
//const express = require('express');
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pongi');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  let error = isNaN(height)?`${req.query.height} is not number`:'';
  error = isNaN(weight)?`${error} ${req.query.weight} is not number`:error;

  if(error) {
    res.status(400);
    res.send(error);
  }else{
    const result = bmiCalculator(height, weight);
    if(result.error) {
      res.status(400);
      res.send(result.error)
    }else{
      res.send(result.data)
    }
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});