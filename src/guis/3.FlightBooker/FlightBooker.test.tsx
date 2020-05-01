import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FlightBooker from './FlightBooker';

describe('3 - FlightBooker', () => {
  it('should book a one way flight', () => {
    const { getByTestId, getByLabelText, getByText } = render(<FlightBooker />);
    // const flightType = getByLabelText(/type/i) as HTMLSelectElement;
    const flightGo = getByLabelText(/start\sdate/i) as HTMLInputElement;
    const form = getByTestId(/form/i) as HTMLButtonElement;

    // fireEvent.click(flightType);
    fireEvent.change(flightGo, { target: { value: '10.02.2030' } });
    fireEvent.submit(form);

    const result = getByTestId('result') as HTMLParagraphElement;

    expect(result.textContent).toBe('Flight Booked');
  });

  it('should book a round way flight', () => {
    const { getByTestId, getByLabelText, getByText } = render(<FlightBooker />);
    const flightType = getByLabelText(/type/i) as HTMLSelectElement;
    fireEvent.click(flightType);

    const flightGo = getByLabelText(/start\sdate/i) as HTMLInputElement;
    const flightBack = getByLabelText(/back\sdate/i) as HTMLInputElement;
    const form = getByTestId(/form/i) as HTMLButtonElement;

    fireEvent.change(flightGo, { target: { value: '2030-02-10' } });
    fireEvent.change(flightBack, { target: { value: '2030-02-11' } });
    fireEvent.submit(form);

    const result = getByTestId('result') as HTMLParagraphElement;

    expect(result.textContent).toBe('Flight Booked');
  });

  it('should get an error if go is emprt', () => {
    const { getByTestId, getByLabelText, getByText } = render(<FlightBooker />);

    const form = getByTestId(/form/i) as HTMLButtonElement;

    fireEvent.submit(form);

    const result = getByTestId('result') as HTMLParagraphElement;

    expect(result.textContent).toHaveTextContent('Error: Outward trip');
  });
});
