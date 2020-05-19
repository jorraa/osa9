import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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
  getNonSensitivePatients,
  addPatient
};