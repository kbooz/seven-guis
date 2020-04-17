import React from 'react';
import { useMachine } from '@xstate/react';
import Machine from './state';

function Counter() {
  const [state, send] = useMachine(Machine);
  return (
    <div>
      <p title="counter">{state.context.count.toString()}</p>
      <button
        type="button"
        title="incrementer"
        onClick={() => send('INCREMENT')}
      >
        Increment
      </button>
    </div>
  );
}

export default Counter;
