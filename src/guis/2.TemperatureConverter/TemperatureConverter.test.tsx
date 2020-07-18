import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TemperatureConverter from './TemperatureConverter';

describe('2 - TemperatureConverter', () => {
	it('should mount', () => {
		const { getByTestId } = render(<TemperatureConverter />);
		const celsius = getByTestId(/celsius/) as HTMLInputElement;
		const fahrenheit = getByTestId(/fahrenheit/) as HTMLInputElement;
		expect(celsius.value).toBe((0).toString());
		expect(fahrenheit.value).toBe((32).toString());
	});

	it('should calculate fahrenheit when changed celsius', () => {
		const { getByTestId } = render(<TemperatureConverter />);
		const celsius = getByTestId(/celsius/) as HTMLInputElement;
		const fahrenheit = getByTestId(/fahrenheit/) as HTMLInputElement;
		fireEvent.change(celsius, { target: { value: 36 } });
		expect(celsius.value).toBe((36).toString());
		expect(fahrenheit.value).toBe((96.8).toString());
	});

	it('should calculate celsius when changed fahrenheit', () => {
		const { getByTestId } = render(<TemperatureConverter />);
		const celsius = getByTestId(/celsius/) as HTMLInputElement;
		const fahrenheit = getByTestId(/fahrenheit/) as HTMLInputElement;
		fireEvent.change(fahrenheit, { target: { value: 100 } });
		expect(celsius.value).toBe((37.77777777777778).toString());
		expect(fahrenheit.value).toBe((100).toString());
	});
});
