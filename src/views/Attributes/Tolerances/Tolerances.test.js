import React from 'react';
import ReactDOM from 'react-dom';
import Tolerances from './Tolerances';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tolerances />, div);
  ReactDOM.unmountComponentAtNode(div);
});
