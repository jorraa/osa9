import { NewEntry, Discharge, SickLeave,
   NewHospitalEntry, NewHealthCheckEntry,
  NewOccupationalHealthcareEntry } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
// isFunctions copy pasted, ok for this task
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isNumber = (val: any): boolean => {
  if(!isNaN(Number(val))) {
    return true;
  }
  return false;
};

const parseDescription = (val: string): string => {
  if (!val || !isString(val)) {
    throw new Error('Incorrect or missing description: ' + val);
  }
  return val;
};

const parseDate = (val: string): string => {
  if (!val || !isString(val) || !isDate(val)) {
    throw new Error('Incorrect or missing date: ' + val);
  }
  return val;
};

const parseSpecialist = (val: string): string => {
  if (!val || !isString(val)) {
    throw new Error('Incorrect or missing specialist: ' + val);
  }
  return val;
};

const parseEmployerName = (val: string): string => {
  if (!val || !isString(val)) {
    throw new Error('Incorrect or missing employerName: ' + val);
  }
  return val;
};

const parseType = (type: string ): string => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  if(type !== 'Hospital' && type !== 'HealthCheck' && type !== 'OccupationalHealthcare') {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseDischarge = (discharge: any): Discharge => {
   
  if(!isDate(discharge.date)) {
    throw new Error('Incorrect or missing discharge.date ' + discharge.date);   
  }
  if(!isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge.criteria ' + discharge.criteria);   
  }
  return {
    date: discharge.date,
    criteria: discharge.criteria 
  };
};

const parseSickLeave = (sickLeave: any): SickLeave => {
   
  if(!isDate(sickLeave.startDate)) {
    throw new Error('Incorrect or missing sickLeave.startDate ' + sickLeave.startDate);   
  }
  if(!isString(sickLeave.endDate)) {
    throw new Error('Incorrect or missing sickLeave.endDate ' + sickLeave.endDate);   
  }
  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate 
  };
};

const parseHealthCheckRating = (healthCheckRating: any): number => {
  if(!isNumber(healthCheckRating)) {
    throw new Error('Incorrect or missing healtCheckRating ' + healthCheckRating);
  }
  if(isString(healthCheckRating)) {
    return Number(healthCheckRating);
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if(!Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosisCodes ' + diagnosisCodes);
  }
  diagnosisCodes.map(diagnosisCode => {
    if(!isString(diagnosisCode)) {
      throw new Error('Incorrect diagnosisCode, not string ' + diagnosisCode);
    }
  });
  return diagnosisCodes;
};

export const toNewEntry = (obj: any): NewEntry => {
  const strType: string = parseType(obj.type);
  const newBaseEntry = {
    description: parseDescription(obj.description),
    date: parseDate(obj.date),
    specialist: parseSpecialist(obj.specialist),
    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
  };
  let newEntry: NewEntry;
  let newHospitalEntry: NewHospitalEntry;
  let newHealthCheckEntry: NewHealthCheckEntry;
  let newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry;

  if (strType === "Hospital") {
    newHospitalEntry = {
      type: "Hospital",
      discharge: parseDischarge(obj.discharge),
      ...newBaseEntry
    };
    newEntry = newHospitalEntry;
  }
  else if(strType === 'HealthCheck') {
    newHealthCheckEntry = {
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      ...newBaseEntry
    };
    newEntry = newHealthCheckEntry;
  } 
  else if(strType === 'OccupationalHealthcare') {
    newOccupationalHealthcareEntry = {
      type: 'OccupationalHealthcare',
      employerName: parseEmployerName(obj.employerName),
      sickLeave: parseSickLeave(obj.sickLeave),
      ...newBaseEntry
    };
    newEntry = newOccupationalHealthcareEntry;
  }else{
    // needed to have value for newEntry
    throw new Error('unknown type');
  }
  return newEntry;
};

/*
  First try, left here because of "fine typing" using as
  Didn't work at end 

const toNewEntryV1 = (obj: any): NewEntry => {
  const strType: string = parseType(obj.type);
  const newEntry: NewEntry = {
    description: parseDescription(obj.description),
    date: parseDate(obj.date),
    specialist: parseSpecialist(obj.specialist),
    //diagnosisCodes?: Array<Diagnosis['code']>;
    type: strType === "Hospital"?"Hospital"
      :strType === "HealthCheck"?"HealthCheck"
      :"OccupationalHealthcare"  
  };
console.log('toHospitalEntry');
  if(obj.type === 'Hospital')   {
    (newEntry as HospitalEntry).discharge = parseDischarge(obj.discharge);
    return newEntry;
  }
console.log('toOccu ...');  
  if(obj.type === 'OccupationalHealthcare')   {
    (newEntry as OccupationalHealthcareEntry).employerName = 
      parseEmployerName(obj.employerName);
    if(obj.sickLeave)   {
      (newEntry as OccupationalHealthcareEntry).sickLeave = 
        parseSickLeave(obj.sickLeave);
    }
    return newEntry;
  }
console.log('toHealthCheck');
  if(obj.type === 'HealthCheck') {
    (newEntry as HealthCheckEntry).healthCheckRating = 
      parseHealthCheckRating(obj.healthCheckRating);
      return newEntry;
  }
  return newEntry;
};
*/
export default toNewEntry;