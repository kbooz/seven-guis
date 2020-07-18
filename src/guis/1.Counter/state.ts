import { Machine, assign } from 'xstate';

interface CounterContext {
	count: number;
}

const CounterMachine = Machine<CounterContext>({
	id: 'counter',
	initial: 'active',
	context: {
		count: 0,
	},
	states: {
		active: {
			on: {
				INCREMENT: {
					actions: assign({ count: (ctx) => ctx.count + 1 }),
				},
			},
		},
	},
});

export default CounterMachine;
