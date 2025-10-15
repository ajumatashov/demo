import React from 'react';
import { Button } from 'reactstrap';

export default function NPSubmitButton({ onClick, disabled, color = 'primary', children, type = 'button' }) {
  return (
    <Button color={color} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </Button>
  );
}


