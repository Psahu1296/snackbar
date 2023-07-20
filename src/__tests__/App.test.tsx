/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import App from '../App';

describe('<App />', () => {
  it('renders without errors', () => {
    render(<App />);
  });

  it('should close after clicking close', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('open-button'));
    const snackbar = screen.getByTestId('snackbar-component');
    const snackbarRemoved = screen.queryByTestId('snackbar-component');
    expect(snackbar).toBeInTheDocument();
    const button = screen.getByTestId('close-btn');
    fireEvent.click(button);
    expect(snackbarRemoved).not.toBeInTheDocument();
  });
});
