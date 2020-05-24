import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (_req, res) => {
  const id: string = _req.params.id;
  console.log('id', id);
  try{
    res.send(patientService.getPatient(id));
  }catch(e) {
    res.status(201).send(e.message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch(e) {
    res.status(400).send(e.message); 
  }
});
export default router;