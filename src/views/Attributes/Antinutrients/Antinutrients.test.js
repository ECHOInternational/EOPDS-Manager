import React from 'react';
import ReactDOM from 'react-dom';
import Antinutrients from './Antinutrients';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Antinutrients />, div);
  ReactDOM.unmountComponentAtNode(div);
});
