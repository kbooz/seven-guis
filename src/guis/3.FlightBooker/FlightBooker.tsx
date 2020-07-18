import React, { ChangeEvent, FormEvent } from 'react';
import { useMachine } from '@xstate/react';
import FlightBookerMachine from './state';

type InputEvent = ChangeEvent<HTMLInputElement>;

export const renderError = (error: FlightBooker.Errors): string => {
	switch (error) {
		case 'INVALID_RETURN':
			return 'Return flight is earlier than start flight';
		case 'NO_RETURN':
			return 'No return flight';
		case 'NO_START':
			return 'No start flight';
		default:
			return 'Unknown error';
	}
};

function FlightBooker() {
	const [state, send] = useMachine(FlightBookerMachine);

	const { trip, startDate, returnDate, error } = state.context;

	const toggleTrip = () => send({ type: 'TOGGLE' });

	const changeStart = ({ target: { value } }: InputEvent) =>
		send({ type: 'CHANGE_START', value });

	const changeReturn = ({ target: { value } }: InputEvent) =>
		send({ type: 'CHANGE_RETURN', value });

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		send({ type: 'SUBMIT' });
	};

	const retry = () => send({ type: 'RETRY' });

	return (
		<>
			<form data-testid="form" onSubmit={onSubmit}>
				<table>
					<tbody>
						<tr>
							<td>
								<label htmlFor="type">Type</label>
							</td>
							<td>
								<button type="button" id="type" onClick={toggleTrip}>
									{trip === 'oneWay' ? 'One Way' : 'Round Trip'}
								</button>
							</td>
						</tr>
						<tr>
							<td>
								<label htmlFor="startDate">Start Date</label>
							</td>
							<td>
								<input
									id="startDate"
									data-testid="startDate"
									type="date"
									value={startDate ?? ''}
									onChange={changeStart}
								/>
							</td>
						</tr>
						{trip === 'roundTrip' && (
							<tr>
								<td>
									<label htmlFor="returnDate">Return Date</label>
								</td>
								<td>
									<input
										id="returnDate"
										type="date"
										value={returnDate ?? ''}
										onChange={changeReturn}
									/>
								</td>
							</tr>
						)}
						<tr>
							<td colSpan={2}>
								<button type="submit">Submit</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
			{!(state.value === 'editing') && (
				<>
					<p data-testid="result">
						{state.value === 'success' && 'Flight Booked'}
						{state.value === 'error' && `Error: ${renderError(error)}`}
					</p>
					{state.value === 'error' && (
						<button type="button" onClick={retry}>
							Retry
						</button>
					)}
				</>
			)}
		</>
	);
}

export default FlightBooker;
