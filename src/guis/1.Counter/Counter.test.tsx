import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Counter from './Counter';

describe('1 - Counter', () => {
	it('should increment the number when clicked', () => {
		const { getByTitle } = render(<Counter />);
		const counter = getByTitle(/counter/i);
		const incrementer = getByTitle(/incrementer/i);
		expect(counter.textContent).toBe('0');
		fireEvent.click(incrementer);
		expect(counter.textContent).toBe('1');
	});
});
