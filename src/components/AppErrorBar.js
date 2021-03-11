import React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import './AppErrorBar.scss';
import { useReactiveVar } from '@apollo/client';
import { appErrorMessages } from '../cache'


const AppErrorBar = (props) =>{
  const messages = useReactiveVar(appErrorMessages);
  const alerts = messages.map((message, index) => (
    <UncontrolledAlert color="danger" key={index}>
        {message}
      </UncontrolledAlert>
    ))

  return alerts
}

export default AppErrorBar;
