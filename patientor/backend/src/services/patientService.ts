import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  console.log('patient', patient);
  if(patient) {
    return patient;
  }
  throw new Error('patient not found');
};

const getNonSensitivePatients = (): NonSensitivePatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient  => {
  const newPatient = {
    id: 'A' + Math.floor(Math.random() * Math.floor(1000000000)),
    ...patient
  };
  
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient
};