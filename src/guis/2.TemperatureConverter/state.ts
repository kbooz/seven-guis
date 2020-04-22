import { Machine, assign } from 'xstate';

interface TemperatureConverterContext {
  fahrenheit: number;
  celsius: number;
}

const context: TemperatureConverterContext = {
  fahrenheit: 32,
  celsius: 0,
};

interface TemperatureConverterSchema {
  states: {
    active: {
      states: {
        CELSIUS: {};
        FAHRENHEIT: {};
      };
    };
  };
}

type TemperatureConverterEvent = { type: string; value: number };

const toFahrenheit = (c: number) => c * 1.8 + 32;
const toCelsius = (f: number) => (f - 32) / 1.8;

const TemperatureConverterMachine = Machine<
  TemperatureConverterContext,
  TemperatureConverterSchema,
  TemperatureConverterEvent
>({
  id: 'TemperatureConverter',
  initial: 'active',
  context,
  states: {
    active: {
      on: {
        CELSIUS: {
          actions: assign<
            TemperatureConverterContext,
            TemperatureConverterEvent
          >({
            celsius: (_, event) => event.value,
            fahrenheit: (_, event) => toFahrenheit(event.value),
          }),
        },
        FAHRENHEIT: {
          actions: assign<
            TemperatureConverterContext,
            TemperatureConverterEvent
          >({
            celsius: (_, event) => toCelsius(event.value),
            fahrenheit: (_, event) => event.value,
          }),
        },
      },
    },
  },
});

export default TemperatureConverterMachine;
