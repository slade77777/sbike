// Library will be called from a library that already has React
// eslint-disable-next-line
import React from 'react';

/*
 * Mock the component library
 * Since the components-library uses React Native, @testing-library cannot properly test.
 * Since these components will be tested anyways, we ignore them by mocking the components
 * inside components-library
 */
jest.mock('shared-ui', () => ({
  Button: () => <></>,
}));
