import { State } from "./state";
import { Patient } from "../types";
type SET_PATIENT = 'SET_PATIENT';
type SET_PATIENT_LIST = 'SET_PATIENT_LIST';
type ADD_PATIENT = 'ADD_PATIENT';
export type Action =
  | {
      type: SET_PATIENT_LIST;
      payload: Patient[];
    }
  | {
      type: ADD_PATIENT;
      payload: Patient;
    }
  | {
      type: SET_PATIENT;
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      console.log('action', action);
      state.patient = action.payload;
      state.patientId = action.payload.id;
      return state;
    default:
      return state;
  }
};

export const setPatient = (patient: Patient) => {
  const thistype: SET_PATIENT = "SET_PATIENT";
  return {
    type: thistype,
    payload: patient 
  };
};


export const setPatientList = (patientListFromApi: Patient[]) => {
  const thistype: SET_PATIENT_LIST = "SET_PATIENT_LIST"; 
  return {
    type: thistype,
    payload: patientListFromApi
  };
};

export const addPatient =(patient: Patient) => {
  const thistype: ADD_PATIENT = "ADD_PATIENT";
  return {
    type: thistype,
    payload: patient
  };
};