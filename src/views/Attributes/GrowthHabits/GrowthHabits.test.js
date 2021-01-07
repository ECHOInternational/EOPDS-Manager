import React from 'react';
import ReactDOM from 'react-dom';
import GrowthHabits from './GrowthHabits';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GrowthHabits />, div);
  ReactDOM.unmountComponentAtNode(div);
});
