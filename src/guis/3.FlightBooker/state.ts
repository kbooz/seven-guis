import { Machine, assign } from 'xstate';

const toggleTrip = assign<FlightBooker.Context>((ctx) => ({
	trip: ctx.trip === 'oneWay' ? 'roundTrip' : 'oneWay',
	backDate: undefined,
}));

const changeGo = assign<FlightBooker.Context, FlightBooker.Event>(
	(_, event) => ({
		backDate: event.value || new Date().toISOString(),
	})
);

const retry = assign<FlightBooker.Context>(() => ({
	backDate: undefined,
	error: undefined,
}));

const changeBack = assign<FlightBooker.Context, FlightBooker.Event>({
	backDate: (ctx, event) => {
		if (ctx.trip === 'oneWay') return undefined;
		return event.value || new Date().toISOString();
	},
});

const isBackEarlierThanGo = ({ backDate, startDate }: FlightBooker.Context) =>
	backDate && backDate < startDate;

const setError = assign<FlightBooker.Context, FlightBooker.Event>({
	// error: (_,e, meta) => meta.
});

const context: FlightBooker.Context = {
	startDate: undefined,
	backDate: undefined,
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
					CHANGE_GO: {
						actions: 'changeGo',
					},
					CHANGE_BACK: {
						actions: 'changeBack',
					},
					SUBMIT: 'submiting',
				},
			},
			submiting: {
				on: {
					'': [
						{ target: 'error', cond: 'isBackEarlierThanGo' },
						{ target: 'success' },
					],
				},
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
			changeGo,
			changeBack,
			retry,
		},
		guards: {
			isBackEarlierThanGo,
		},
	}
);

export default FlightBookerMachine;
