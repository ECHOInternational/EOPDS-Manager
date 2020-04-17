import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './Categories';

it('renders Categories without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Categories />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a Category without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Category />, div);
  ReactDOM.unmountComponentAtNode(div);
});