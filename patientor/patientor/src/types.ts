export type HOSPITAL = "Hospital"; 
export type OCCUPATINAL_HEALTHCARE = "OccupationalHealthcare";
export type HEALTH_CHECK = "HealthCheck";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: 
  Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface SickLeave {
  startDate: string;
  endDate: string;
}
interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry{
  type: HOSPITAL;
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
  type: OCCUPATINAL_HEALTHCARE;
  employerName: string;
  sickLeave?: SickLeave;

}

export interface HealthCheckEntry extends BaseEntry {
  type: HEALTH_CHECK;
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthcareEntry 
            = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewEntry = 
| NewHospitalEntry
| NewHealthCheckEntry
| NewOccupationalHealthcareEntry;