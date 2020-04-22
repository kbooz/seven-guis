import React from 'react';
import { useMachine } from '@xstate/react';
import Machine from './state';

function TemperatureConverter() {
  const [state, send] = useMachine(Machine);
  return (
    <div>
      <label>
        Celsius:{' '}
        <input
          type="text"
          value={state.context.celsius}
          data-testid="celsius"
          onChange={({ target: { value } }) => send('CELSIUS', { value })}
        />
      </label>
      <label>
        Fahrenheit:{' '}
        <input
          type="text"
          value={state.context.fahrenheit}
          data-testid="fahrenheit"
          onChange={({ target: { value } }) => send('FAHRENHEIT', { value })}
        />
      </label>
    </div>
  );
}

export default TemperatureConverter;
