import React from 'react';
import ReactDOM from 'react-dom';
import Varieties from './Varieties';

it('renders Varieties without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Varieties />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a Variety without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Variety />, div);
  ReactDOM.unmountComponentAtNode(div);
});