import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../../state";

import { TextField, NumberField, DiagnosisSelection } from "./FormField";
import { HospitalEntry } from '../../types';
 
type NestedErrors = {
  dischargeDateError: string;
};

// eslint-disable-next-line
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line
const isNumber = (val: any): boolean => {
  if(!isNaN(Number(val))) {
    return true;
  }
  return false;
};

export type HospitalFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [{ diagnosesCodes }, ] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: ''
        } 
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }else{
          const val = values.date;
          if (!val || !isString(val) || !isDate(val)) {
            errors.date ='Incorrect date: ' + val;
          }
        } 
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge.date) {
          errors['discharge.date'] = requiredError;
        }else{
          const val = values.discharge.date;
          if (!isString(val) || !isDate(val)) {
            errors['discharge.date'] ='Incorrect discharge.date: ' + val;
          }
        }
        if (!values.discharge.criteria) {
          errors['discharge.criteria'] = requiredError;
        }

        console.log('ERRORS--->', errors);
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosesCodes)}
            />    
            <Field 
                label="Discharge date"
                placeholder='YYYY-MM-DD'
                name='discharge.date'
                component={TextField}
            />
            <span id='dischargeDate' style={{ color:'red' }}></span>

            <Field 
                label="Discharge criteria"
                placeholder='criteria'
                name='discharge.criteria'
                component={TextField}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
