import React from 'react';
import ReactDOM from 'react-dom';
import KoClimateZones from './KoClimateZones';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<KoClimateZones />, div);
  ReactDOM.unmountComponentAtNode(div);
});
