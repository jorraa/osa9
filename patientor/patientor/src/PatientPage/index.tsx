import React from 'react';
import axios from "axios";

import { useParams } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";

import { useStateValue, setPatient } from "../state";
import { Patient, Entry } from '../types';
import { getPatient } from '../services/patientService';

import EntryDetails from './EntryDetails';
import AddEntryModal from './AddEntryModal';

import { HospitalFormValues } from './AddEntryModal/AddEntryForm';

const entryStyle = {
  margin: 2,
  border: 'solid'
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line
  const [patientId2, setPatientId] = React.useState(''); // needed to refresh page
  const [{ patientId }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if(id !== patientId) {
    getPatient(id).then(  (patient: Patient ) => {
      dispatch(setPatient(patient));
      setPatientId(patient.id);
    });
  }
  const [{ patient, diagnosesCodes }, ] = useStateValue();
  if(!patient)  {
    return <p>patient not found</p>;
  }
  
  const submitNewEntry = async (values: HospitalFormValues) => {
    try {
      const { data: patient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(setPatient(patient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />

      <Button onClick={() => openModal()}>Add New Entry</Button>
      {Object.values(patient.entries).map((entry: Entry) => (
        <div key={entry.id} style={ entryStyle }>
          <p>
            <b>{entry.date}</b>
            <i aria-hidden="true" className='user doctor big icon'/> 
          </p> 
          <p>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.length>0
              ?Object.values(entry.diagnosisCodes.map((code) =>  
            <li key={code}>{code} {diagnosesCodes[code]?diagnosesCodes[code].name:'unknown code'}</li>
              ))  
              :<></>
            }  
          </ul>
          <div>
            <EntryDetails entry={entry}/>
          </div>
        </div>
      ))}
    </div>;
};

export default PatientPage;