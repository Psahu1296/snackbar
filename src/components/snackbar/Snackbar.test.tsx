/**
 * @jest-environment jsdom
 */

import { act, fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import Snackbar from './Snackbar';

describe('<Snackbar />', () => {
  const props = {
    open: true,
    onclose: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should have text', () => {
    render(<Snackbar {...props}>warning text</Snackbar>);
    const paragraph = screen.getByTestId('message-txt');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(/warning text/i);
  });

  it('Button should exist', () => {
    render(
      <Snackbar
        {...props}
        type="action"
        actionProps={
          <button type="button" data-testid="action-btn">
            Action
          </button>
        }
      >warning text</Snackbar>
    );
    const button = screen.getByTestId('action-btn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Action');
  });

  it('should call handleClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Snackbar {...props} canBeClosed onclose={handleClick}>warning text</Snackbar>);
    const button = screen.getByTestId('close-btn');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('Snackbar component should close after 3 sec', () => {
    const openState = true;
    const closefn = jest.fn();
    render(
      <Snackbar open={openState} onclose={closefn}>
        warning Test
      </Snackbar>
    );
    const snackbar = screen.getByTestId('snackbar-component');
    expect(snackbar).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(closefn).toBeCalled();
  });
});
