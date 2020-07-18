import { Machine, assign } from 'xstate';

const toggleTrip = assign<FlightBooker.Context>((ctx) => ({
	trip: ctx.trip === 'oneWay' ? 'roundTrip' : 'oneWay',
	returnDate: undefined,
}));

const changeStart = assign<FlightBooker.Context, FlightBooker.Event>(
	(_, event) => ({
		startDate: event.value,
	})
);

const retry = assign<FlightBooker.Context>(() => ({
	returnDate: undefined,
	error: undefined,
}));

const changeReturn = assign<FlightBooker.Context, FlightBooker.Event>({
	returnDate: (ctx, event) => {
		if (ctx.trip === 'oneWay') return undefined;
		return event.value || new Date().toISOString();
	},
});

const setError = assign<FlightBooker.Context, FlightBooker.Event>({
	error: ({ returnDate, startDate, trip }) => {
		if (!startDate) return 'NO_START';
		if (trip === 'roundTrip') {
			if (!returnDate) return 'NO_RETURN';
			if (startDate > returnDate) return 'INVALID_RETURN';
		}
		return undefined;
	},
});

const isStartEarlierThanReturn = ({
	returnDate,
	startDate,
	trip,
}: FlightBooker.Context) => {
	if (!startDate) return false;
	if (trip === 'roundTrip') {
		if (!returnDate) return false;
		if (startDate > returnDate) return false;
	}
	return true;
};

const context: FlightBooker.Context = {
	startDate: undefined,
	returnDate: undefined,
	trip: 'oneWay',
};

const FlightBookerMachine = Machine<
	FlightBooker.Context,
	FlightBooker.Schema,
	FlightBooker.Event
>(
	{
		id: 'trip_selection',
		initial: 'editing',
		context,
		states: {
			editing: {
				on: {
					TOGGLE: {
						actions: 'toggleTrip',
					},
					CHANGE_START: {
						actions: 'changeStart',
					},
					CHANGE_RETURN: {
						actions: 'changeReturn',
					},
					SUBMIT: 'submiting',
				},
			},
			submiting: {
				always: [
					{ target: 'success', cond: 'isStartEarlierThanReturn' },
					{ target: 'error', actions: 'setError' },
				],
			},
			error: {
				on: {
					RETRY: {
						target: 'editing',
						actions: 'retry',
					},
				},
			},
			success: {
				type: 'final',
			},
		},
	},
	{
		actions: {
			toggleTrip,
			changeStart,
			changeReturn,
			retry,
			setError,
		},
		guards: {
			isStartEarlierThanReturn,
		},
	}
);

export default FlightBookerMachine;
