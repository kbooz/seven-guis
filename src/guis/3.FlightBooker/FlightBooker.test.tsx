import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FlightBooker, { renderError } from './FlightBooker';

describe('3 - FlightBooker', () => {
	it('should book a one way flight', () => {
		const { getByTestId, getByLabelText, getByText } = render(<FlightBooker />);
		// const flightType = getByLabelText(/type/i) as HTMLSelectElement;
		const flightGo = getByTestId(/startDate/i) as HTMLInputElement;
		const form = getByTestId(/form/i) as HTMLButtonElement;

		// fireEvent.click(flightType);
		fireEvent.change(flightGo, { target: { value: '2020-07-06' } });
		fireEvent.submit(form);

		const result = getByTestId('result') as HTMLParagraphElement;

		expect(result.textContent).toBe('Flight Booked');
	});

	it('should book a round way flight', () => {
		const { getByTestId, getByLabelText, getByText } = render(<FlightBooker />);
		const flightType = getByLabelText(/type/i) as HTMLSelectElement;
		fireEvent.click(flightType);

		const flightGo = getByLabelText(/start\sdate/i) as HTMLInputElement;
		const flightReturn = getByLabelText(/return\sdate/i) as HTMLInputElement;
		const form = getByTestId(/form/i) as HTMLButtonElement;

		fireEvent.change(flightGo, { target: { value: '2030-02-10' } });
		fireEvent.change(flightReturn, { target: { value: '2030-02-11' } });
		fireEvent.submit(form);

		const result = getByTestId('result') as HTMLParagraphElement;

		expect(result.textContent).toBe('Flight Booked');
	});

	it('should get an error if go is empty', () => {
		const { getByTestId, getByLabelText, getByText } = render(<FlightBooker />);

		const form = getByTestId(/form/i) as HTMLButtonElement;

		fireEvent.submit(form);

		const result = getByTestId('result') as HTMLParagraphElement;

		expect(result.textContent).toBe(`Error: ${renderError('NO_START')}`);
	});
});
