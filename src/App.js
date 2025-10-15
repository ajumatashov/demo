import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Navbar, NavbarBrand } from 'reactstrap';
import React from 'react';
import SimpleFormPage from './pages/SimpleFormPage';
import TabbedFormPage from './pages/TabbedFormPage';
import WizardPage from './pages/WizardPage';

function App() {
  const [open, setOpen] = React.useState(true);
  return (
    <BrowserRouter>
      <Navbar color="dark" dark className="app-navbar" expand="md">
        <Container fluid>
          <NavbarBrand href="#">CorpForms</NavbarBrand>
        </Container>
      </Navbar>
      <Container fluid className="app-shell">
        <Row>
          <Col xs="auto" className={`sidebar ${open ? 'open' : 'closed'}`}>
            <div className="d-flex flex-column">
              <Button color="secondary" className="toggle-btn mb-3" onClick={() => setOpen(o => !o)}>
                {open ? '⟨' : '☰'}
              </Button>
              {open && (
                <ListGroup className="sidebar-list">
                  <ListGroupItem tag={NavLink} end to="/" action className={({ isActive }) => isActive ? 'active' : ''}>
                    🟢 NPSimpleForm — простая форма
                  </ListGroupItem>
                  <ListGroupItem tag={NavLink} to="/tabs" action className={({ isActive }) => isActive ? 'active' : ''}>
                    🟣 NPTabbedForm — форма с вкладками
                  </ListGroupItem>
                  <ListGroupItem tag={NavLink} to="/wizard" action className={({ isActive }) => isActive ? 'active' : ''}>
                    🔵 NPWizard — многошаговая форма
                  </ListGroupItem>
                </ListGroup>
              )}
            </div>
          </Col>
          <Col className="content-col">
            <Routes>
              <Route path="/" element={<SimpleFormPage />} />
              <Route path="/tabs" element={<TabbedFormPage />} />
              <Route path="/wizard" element={<WizardPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
