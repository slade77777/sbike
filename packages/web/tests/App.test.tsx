import React from 'react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {render, fireEvent} from '@testing-library/react';
import App from '../src/App';

describe('Application setup', () => {
  test('renders the homepage', () => {
    const history = createMemoryHistory();

    const {getByText} = render(
      <Router history={history as any}>
        <App />
      </Router>,
    );

    const homeHeader = getByText(/This is the/i);
    expect(homeHeader.innerHTML).toBe('This is the homepage');
  });

  test('routes to the second page when clicked on', () => {
    const history = createMemoryHistory();

    const {container, getByText} = render(
      <Router history={history as any}>
        <App />
      </Router>,
    );

    // Show the homepage
    expect(container.innerHTML).toMatch('This is the homepage');

    const routeLink = getByText('Route to second page');
    fireEvent.click(routeLink);

    // Show the second page
    expect(container.innerHTML).toMatch('This is the Secondpage');
  });
});
