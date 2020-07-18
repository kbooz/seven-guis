namespace FlightBooker {
	type Errors = 'NO_START' | 'NO_RETURN' | 'INVALID_RETURN';

	interface Context {
		error?: Errors;
		startDate?: string;
		returnDate?: string;
		trip: 'oneWay' | 'roundTrip';
	}

	interface Schema {
		states: {
			editing: Record<string, unknown>;
			submiting: Record<string, unknown>;
			error: Record<string, unknown>;
			success: Record<string, unknown>;
		};
	}

	type EventTypes =
		| 'TOGGLE'
		| 'CHANGE_START'
		| 'CHANGE_RETURN'
		| 'SUBMIT'
		| 'RETRY';

	type Event = { type: EventTypes; value?: string };
}
