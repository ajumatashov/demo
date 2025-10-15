import React from 'react';
import { Button } from 'reactstrap';

export default function NPCancelButton({ onClick, disabled, children }) {
  return (
    <Button color="secondary" onClick={onClick} disabled={disabled} className="me-2">
      {children}
    </Button>
  );
}


