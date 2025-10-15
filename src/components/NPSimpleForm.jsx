import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import NPCancelButton from './NPCancelButton';
import NPSubmitButton from './NPSubmitButton';

export default function NPSimpleForm({
  isReadOnly = false,
  isEdit = false,
  initialValues,
  onSubmit,
  onCancel,
  validationSchema,
  title,
  children,
}) {
  const [editMode, setEditMode] = useState(!isReadOnly && isEdit);

  const validation = useMemo(() => validationSchema, [validationSchema]);

  const handleEditClick = () => setEditMode(true);

  return (
    <Card className="mt-3">
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, helpers) => {
            if (onSubmit) onSubmit(values);
            helpers.setSubmitting(false);
            setEditMode(false);
          }}
          enableReinitialize
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <fieldset disabled={!editMode} style={{ border: 0, padding: 0, margin: 0 }}>
                {children}
              </fieldset>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <NPCancelButton onClick={onCancel}>Отмена</NPCancelButton>
                  {!isReadOnly && (
                    editMode ? (
                      <NPSubmitButton type="submit" disabled={isSubmitting}>
                        Сохранить
                      </NPSubmitButton>
                    ) : (
                      <NPSubmitButton onClick={handleEditClick}>
                        Изменить
                      </NPSubmitButton>
                    )
                  )}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}


