import React from 'react';
import ReactDOM from 'react-dom';
import Plants from './Plants';

it('renders Plants without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Plants />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a Plant without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Plant />, div);
  ReactDOM.unmountComponentAtNode(div);
});