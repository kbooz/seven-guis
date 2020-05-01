namespace FlightBooker {
  interface Context {
    error?: string;
    startDate?: string;
    backDate?: string;
    trip: 'oneWay' | 'roundTrip';
  }

  interface Schema {
    states: {
      editing: {};
      submiting: {};
      error: {};
      success: {};
    };
  }

  type EventTypes = 'TOGGLE' | 'CHANGE_GO' | 'CHANGE_BACK' | 'SUBMIT' | 'RETRY';

  type Event = { type: EventTypes; value?: string };
}
