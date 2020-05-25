import React from 'react';
import { useParams } from 'react-router-dom';

import { useStateValue, setPatient } from "../state";
import { Patient, Entry } from '../types';
import { getPatient } from '../services/patientService';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line
  const [patientId2, setPatientId] = React.useState(''); // needed to refresh page
  const [{ patientId }, dispatch] = useStateValue();

  if(id !== patientId) {
    getPatient(id).then(  (patient: Patient ) => {
    //dispatch({ type: "SET_PATIENT", payload: patient });
      dispatch(setPatient(patient));
      setPatientId(patient.id);
    });
  }
  const [{ patient, diagnosesCodes }, ] = useStateValue();
  if(!patient)  {
    return <p>patient not found</p>;
  }

  const iconClass: string = patient.gender === 'female'
    ?'venus big icon'
    :patient.gender === 'male'
      ?'mars big icon'
      :'transgender alternate big icon';
    return <div>
      <p>
        <strong>{ patient.name } </strong>
        <i aria-hidden="true" className={ iconClass }/>  
      </p>
      <p>
        ssn: {patient.ssn}
      </p>
      <p>
        occupation: {patient.occupation}
      </p>
      <p><b>entries</b></p>
      {Object.values(patient.entries).map((entry: Entry) => (
        <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.length>0
              ?Object.values(entry.diagnosisCodes.map((code) =>  
            <li key={code}>{code} {diagnosesCodes[code]?diagnosesCodes[code].name:'unknown code'}</li>
              ))  
              :<></>
            }  
          </ul>
        </div>
      ))}
    </div>;
};

export default PatientPage;