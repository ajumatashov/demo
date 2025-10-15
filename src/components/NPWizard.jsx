import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import NPCancelButton from './NPCancelButton';
import NPSubmitButton from './NPSubmitButton';

export default function NPWizard({ onSubmit, onCancel, title, children }) {
  const pages = React.Children.toArray(children);
  const [activePage, setActivePage] = useState(0);
  const [valuesByPage, setValuesByPage] = useState(pages.map(p => p.props.initialValues || {}));

  const isFirst = activePage === 0;
  const isLast = activePage === pages.length - 1;

  const validationSchema = useMemo(() => pages[activePage]?.props?.validationSchema, [pages, activePage]);
  const initialValues = useMemo(() => valuesByPage[activePage] || {}, [valuesByPage, activePage]);

  const goPrev = (currentValues) => {
    if (isFirst) return;
    setValuesByPage(prev => {
      const copy = prev.slice();
      copy[activePage] = currentValues;
      return copy;
    });
    setActivePage(p => p - 1);
  };

  const handleNextOrSubmit = async (values, helpers) => {
    const errors = await helpers.validateForm();
    if (Object.keys(errors).length > 0) {
      helpers.setTouched(Object.fromEntries(Object.keys(values).map(k => [k, true])));
      return;
    }
    const updated = valuesByPage.slice();
    updated[activePage] = values;
    setValuesByPage(updated);

    if (isLast) {
      if (onSubmit) onSubmit(updated);
    } else {
      setActivePage(p => p + 1);
    }
  };

  return (
    <Card className="mt-3">
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize onSubmit={handleNextOrSubmit}>
          {({ handleSubmit, isSubmitting, values }) => (
            <Form onSubmit={handleSubmit}>
              <h5 className="mb-3">{pages[activePage]?.props?.title}</h5>
              {pages[activePage]}
              <Row className="mt-3">
                <Col className="d-flex justify-content-between">
                  <NPCancelButton onClick={onCancel}>Отмена</NPCancelButton>
                  <div>
                    <NPCancelButton onClick={() => goPrev(values)} disabled={isFirst}>
                      Назад
                    </NPCancelButton>
                    <NPSubmitButton type="submit" disabled={isSubmitting}>
                      {isLast ? 'Сохранить' : 'Далее'}
                    </NPSubmitButton>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}


