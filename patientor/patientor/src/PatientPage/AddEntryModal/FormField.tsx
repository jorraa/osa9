import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis } from "../../types";
import { parseTouched} from './util';

// structure of a single option
export type DiagnosisCodeOption = {
  value: Diagnosis;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: [{"value": '123'; "label": 'dianosisCode'}];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  className: string;
}
interface NestedTextProps extends FieldProps {
  name: string;
  label: string;
  placeholder: string;
  className: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
  className
  }) => (
  <Form.Field>
    <span className={className}>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
    </span>
  </Form.Field>
);

/*
  for nested fields like discharge.date
*/

export const NestedTextField: React.FC<NestedTextProps> = ({
  field,
  name,
  form: { touched, errors },
  label,
  placeholder,
  className,
  ...props
}) => {
  return <div className={className}>
    <label>{label}</label>
    <input type="text" placeholder={placeholder} name={name} {...field} {...props} />
    {parseTouched(field.name, touched) &&
      errors[field.name] && 
      <div style={{ color:'red' }}>{errors[field.name]}</div>}
  </div>;
};

/*
export const TextFieldNested: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
  setFieldValue,
  setFieldError
}) => {
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: string
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  return <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>;
};
*/

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
