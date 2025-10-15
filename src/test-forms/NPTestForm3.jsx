import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';

export default function NPTestForm3() {
  return (
    <FormGroup>
      <Label for="email">Электронная почта</Label>
      <Field id="email" name="email" type="text" className="form-control" />
      <div className="text-danger small"><ErrorMessage name="email" /></div>
    </FormGroup>
  );
}


