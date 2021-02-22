import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const LoginButton = (props) => {
  let history = useHistory();

  function handleClick(){
    history.push("/login")
  }

  return(<Button outline color="primary" className="mx-4" onClick={handleClick}>Login</Button>)
}

export default LoginButton;