import React from 'react';
import { Button } from 'reactstrap';

const LoginButton = (props) => {
   return(<Button outline color="primary" className="mx-4" onClick={props.onClick}>Login</Button>)
}

export default LoginButton;