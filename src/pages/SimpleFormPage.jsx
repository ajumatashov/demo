import React from 'react';
import * as Yup from 'yup';
import NPSimpleForm from '../components/NPSimpleForm';
import NPTestForm1 from '../test-forms/NPTestForm1';

const schema = Yup.object({
  firstName: Yup.string().required('Обязательное поле'),
});

export default function SimpleFormPage() {
  return (
    <NPSimpleForm
      title="Простая форма"
      isReadOnly={false}
      isEdit={false}
      initialValues={{ firstName: '' }}
      validationSchema={schema}
      onSubmit={(values) => console.log(values.firstName)}
      onCancel={() => console.log('onCancel')}
    >
      <NPTestForm1 />
    </NPSimpleForm>
  );
}


