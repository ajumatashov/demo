import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';

export default function NPTestForm1() {
  return (
    <FormGroup>
      <Label for="firstName">Имя</Label>
      <Field id="firstName" name="firstName" type="text" className="form-control" />
      <div className="text-danger small"><ErrorMessage name="firstName" /></div>
    </FormGroup>
  );
}


