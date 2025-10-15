import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';

export default function NPTestForm2() {
  return (
    <FormGroup>
      <Label for="lastName">Фамилия</Label>
      <Field id="lastName" name="lastName" type="text" className="form-control" />
      <div className="text-danger small"><ErrorMessage name="lastName" /></div>
    </FormGroup>
  );
}


