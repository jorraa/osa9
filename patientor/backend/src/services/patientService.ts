import patientData from '../../data/patients';

import { Entry, NewEntry, Patient, NonSensitivePatient, NewPatient, 
  HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
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
const getId = (): string => {
  return 'A' + Math.floor(Math.random() * Math.floor(1000000000));
};
const parseAgain = (newEntry: NewEntry): Entry => {
  switch(newEntry.type) {
    case "Hospital": 
      const entry1: HospitalEntry = {
        ...(newEntry as HospitalEntry) ,
        id: getId(),
      };
      return entry1;
    case "OccupationalHealthcare":
      const entry2: OccupationalHealthcareEntry = {
        ...(newEntry as OccupationalHealthcareEntry),
        id: getId()
      };
      return entry2;
    case "HealthCheck":
      const entry3: HealthCheckEntry = {
        ...(newEntry as HealthCheckEntry),
        id: getId()
      };
      return entry3;
    default: throw new Error('unknown type');
  } 
};

const addPatientEntry = (patient: Patient, newEntry: NewEntry): Patient  => {
  // I suppose database would make parsing(=add id) if we were using it
  const entry: Entry  = parseAgain(newEntry);

  patient.entries.push(entry);
  return patient;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addPatientEntry
};
