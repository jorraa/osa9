import React from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosesCodes } from "./state";

import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

const App: React.FC = () => {
  
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        //dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch( setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
    
    const fetchDiagnosesCodes = async () => {
      try {
        const { data: diagnosesCodes } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        //dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch( setDiagnosesCodes(diagnosesCodes));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosesCodes();
  }, [dispatch]);
  
  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
        </Button>
        <Divider hidden />
        <Switch>
          <Route path="/api/patients/:id" render={() => <PatientPage />} />
          <Route path="/" render={() => <PatientListPage />} />
          
        </Switch>
      </Container>
    </div>
  );
};

export default App;
