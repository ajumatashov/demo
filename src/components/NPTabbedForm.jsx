import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Formik, Form } from 'formik';
import NPCancelButton from './NPCancelButton';
import NPSubmitButton from './NPSubmitButton';

export default function NPTabbedForm({ isReadOnly = false, isEdit = false, onSubmit, onCancel, title, children }) {
  const tabs = React.Children.toArray(children);
  const [activeTab, setActiveTab] = useState('0');
  const [editMode, setEditMode] = useState(!isReadOnly && isEdit);
  const [valuesByTab, setValuesByTab] = useState(tabs.map(tab => tab.props.initialValues || {}));

  const activeIndex = parseInt(activeTab, 10);
  const validationSchema = useMemo(() => tabs[activeIndex]?.props?.validationSchema, [tabs, activeIndex]);
  const initialValues = useMemo(() => valuesByTab[activeIndex] || {}, [valuesByTab, activeIndex]);

  const handleSwitchTab = async (currentFormik, nextIndex) => {
    const nextId = String(nextIndex);
    if (!editMode) {
      setActiveTab(nextId);
      return;
    }
    const errors = await currentFormik.validateForm();
    if (Object.keys(errors).length === 0) {
      setValuesByTab(prev => {
        const copy = prev.slice();
        copy[activeIndex] = currentFormik.values;
        return copy;
      });
      setActiveTab(nextId);
    } else {
      currentFormik.setTouched(Object.fromEntries(Object.keys(currentFormik.values).map(k => [k, true])));
    }
  };

  const handleSubmit = async (values, helpers) => {
    const errors = await helpers.validateForm();
    if (Object.keys(errors).length === 0) {
      const finalValues = valuesByTab.slice();
      finalValues[activeIndex] = values;
      if (onSubmit) onSubmit(finalValues);
      setEditMode(false);
    } else {
      helpers.setTouched(Object.fromEntries(Object.keys(values).map(k => [k, true])));
    }
    helpers.setSubmitting(false);
  };

  return (
    <Card className="mt-3">
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize onSubmit={handleSubmit}>
          {formik => (
            <Form onSubmit={formik.handleSubmit}>
              <Nav tabs>
                {tabs.map((tab, idx) => (
                  <NavItem key={idx}>
                    <NavLink active={activeTab === String(idx)} onClick={() => handleSwitchTab(formik, idx)}>
                      {tab.props.title}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
              <TabContent activeTab={activeTab} className="mt-3">
                {tabs.map((tab, idx) => (
                  <TabPane tabId={String(idx)} key={idx} className={activeTab === String(idx) ? 'd-block' : 'd-none'}>
                    <fieldset disabled={!editMode} style={{ border: 0, padding: 0, margin: 0 }}>
                      {tab}
                    </fieldset>
                  </TabPane>
                ))}
              </TabContent>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <NPCancelButton onClick={onCancel}>Отмена</NPCancelButton>
                  {!isReadOnly && (
                    editMode ? (
                      <NPSubmitButton type="submit" disabled={formik.isSubmitting}>
                        Сохранить
                      </NPSubmitButton>
                    ) : (
                      <NPSubmitButton onClick={() => setEditMode(true)}>
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


