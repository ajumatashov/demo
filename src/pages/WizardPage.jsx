import React from 'react';
import * as Yup from 'yup';
import NPWizard from '../components/NPWizard';
import NPTestForm1 from '../test-forms/NPTestForm1';
import NPTestForm2 from '../test-forms/NPTestForm2';
import NPTestForm3 from '../test-forms/NPTestForm3';

const schema1 = Yup.object({ firstName: Yup.string().required('Обязательное поле') });
const schema2 = Yup.object({ lastName: Yup.string().required('Обязательное поле') });
const schema3 = Yup.object({ email: Yup.string().required('Обязательное поле') });

export default function WizardPage() {
  return (
    <NPWizard
      title="Многостраничная форма (Wizard)"
      onSubmit={(valuesArray) => {
        const [v1, v2, v3] = valuesArray;
        console.log(v1.firstName, v2.lastName, v3.email);
      }}
      onCancel={() => console.log('onCancel')}
    >
      <div title="NPTestForm1" initialValues={{ firstName: '' }} validationSchema={schema1}>
        <NPTestForm1 />
      </div>
      <div title="NPTestForm2" initialValues={{ lastName: '' }} validationSchema={schema2}>
        <NPTestForm2 />
      </div>
      <div title="NPTestForm3" initialValues={{ email: '' }} validationSchema={schema3}>
        <NPTestForm3 />
      </div>
    </NPWizard>
  );
}


