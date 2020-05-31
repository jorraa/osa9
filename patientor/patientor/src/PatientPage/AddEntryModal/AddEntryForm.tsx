import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../../state";
import './entry.css';

import { TextField, NumberField, DiagnosisSelection, NestedTextField } from "./FormField";
import { /*NewEntry,*/ NewHospitalEntry, NewHealthCheckEntry, NewOccupationalHealthcareEntry, HOSPITAL, HEALTH_CHECK, OCCUPATINAL_HEALTHCARE,
/*HOSPITAL, HEALTH_CHECK, OCCUPATINAL_HEALTHCARE*/ } from '../../types';
 
// eslint-disable-next-line
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  if(date.split('-').length !== 3) {return false;}
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line
const isNumber = (val: any): boolean => {
  if(!isNaN(Number(val))) {
    return true;
  }
  return false;
};
interface Props {
  entryType: string; //"Hospital"|"HealthCheck"|"OccupationalHealthCare"; //HOSPITAL| HEALTH_CHECK | OCCUPATINAL_HEALTHCARE;
  onSubmit: (values: NewHospitalEntry|NewHealthCheckEntry|NewOccupationalHealthcareEntry) => void; 
  //onSubmitHosp: (values: NewHospitalEntry) => void;
  //onSubmitHealth: (values: NewHealthCheckEntry) => void;
  //onSubmitOccu: (values: NewOccupationalHealthcareEntry) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ entryType, onSubmit, onCancel }) => {
//  const onSubmit = entryType === 'Hospital'?onSubmitHosp
//    :entryType === 'HealthCheck'?onSubmitHealth
//      :onSubmitOccu;

  const hospType: HOSPITAL = 'Hospital';
  const healthType: HEALTH_CHECK = 'HealthCheck';
  const occuType: OCCUPATINAL_HEALTHCARE = 'OccupationalHealthcare';

  const  baseValues = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
  };

  const hospValues = {
    type: hospType,
    discharge: {
      date: '',
      criteria: ''
    }, 
    ...baseValues
  };
  const healthValues = {
    type: healthType,
    healthCheckRating: 0,
    ...baseValues
  };
  
  const occuValues = {
    type: occuType,
    employerName:'',
    sickLeave: {
      startDate:'',
      endDate: ''
    },
    ...baseValues
  };

  const hospClass = entryType === 'Hospital'
    ? 'show'
    : 'hide';
  const healthClass = entryType === 'HealthCheck'
    ? 'show'
    : 'hide';
  const occuClass = entryType === 'OccupationalHealthcare'
    ? 'show'
    : 'hide';

  const [{ diagnosesCodes }, ] = useStateValue();

  return (
    <Formik
      initialValues={{
        ...(entryType === 'Hospital' ? hospValues
          : entryType === 'HealthCheck' ? healthValues
            : occuValues)
        }
      }
      /*
        initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: ''
        }, 
        healthCheckRating: 0,
        employerName: '',
        sickLeave: undefined
      }}
  */
      onSubmit={onSubmit}
      validate={ (values) => {
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
        
        if(values.type === 'Hospital') {
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
        }
        if(values.type === 'OccupationalHealthcare') {
          if(!values.sickLeave) {
            console.log('No sickLeave');
          }else {
            if (!values.sickLeave.startDate) {
              errors['sickLeave.startDate'] = requiredError;
            }else{
              const val = values.sickLeave.endDate;
              if (!isString(val) || !isDate(val)) {
                errors['sickLeave.endDate'] ='Incorrect sickLeave.endDdate: ' + val;
              }
            }
            if(values.sickLeave.startDate > values.sickLeave.endDate) {
              const val = values.sickLeave.endDate;
              errors['sickLeave.endDate'] =
                'Incorrect sickLeave.endDdate, must be later than startDate: ' + val;
            }
          }
          if (!values.employerName) {
            errors['employerName'] = requiredError;
          }
        }
        if(values.type === 'HealthCheck') {
          if(values.healthCheckRating < 0 || values.healthCheckRating > 3) {
            errors['healthCheckRating'] = 'healthCheck rating must be between 0 and 4';
          }
        }


        //console.log('ERRORS--->', errors);
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
              className='hosp occu health'
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
                component={NestedTextField}
                className={hospClass}
            />
            <span id='discharge.date' style={{ color:'red' }}></span>

            <Field 
                label="Discharge criteria"
                placeholder='criteria'
                name='discharge.criteria'
                component={NestedTextField}
                className={hospClass}
            />
            <span id='discharge.criteria' style={{ color:'red' }}></span>
            <Field 
              label='Health check rating'
              name='healthCheckRating'
              min={0}
              max={3}
              component={NumberField}
              className={healthClass}
            />
            <Field
              label='Employer name'  
              placeholder='employer name'
              name='employerName'
              component={TextField}
              className={occuClass}
            />
            <Field 
              label="Sickleave start date"
              placeholder='YYYY-MM-DD'
              name='sickLeave.startDate'
              component={NestedTextField}
              className={occuClass}
            />
            <Field 
              label="Sickleave end date"
              placeholder='YYYY-MM-DD'
              name='sickLeave.endDate'
              component={NestedTextField}
              className={occuClass}
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

export default AddEntryForm;
