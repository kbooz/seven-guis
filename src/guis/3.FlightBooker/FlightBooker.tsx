import React, { ChangeEvent } from 'react';
import { useMachine } from '@xstate/react';
import FlightBookerMachine from './state';

type InputEvent = ChangeEvent<HTMLInputElement>;

function FlightBooker() {
  const [state, send] = useMachine(FlightBookerMachine);

  const { trip, startDate, backDate, error } = state.context;

  const toggleTrip = () => send({ type: 'TOGGLE' });

  const changeGo = ({ target: { value } }: InputEvent) =>
    send({ type: 'CHANGE_GO', value });

  const changeBack = ({ target: { value } }: InputEvent) =>
    send({ type: 'CHANGE_BACK', value });

  const submit = () => {
    send({ type: 'SUBMIT' });
    return false;
  };

  const retry = () => send({ type: 'RETRY' });

  return (
    <>
      <form data-testid="form" onSubmit={submit}>
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
                  type="date"
                  value={startDate ?? ''}
                  onChange={changeGo}
                />
              </td>
            </tr>
            {trip === 'roundTrip' && (
              <tr>
                <td>
                  <label htmlFor="backDate">Back Date</label>
                </td>
                <td>
                  <input
                    id="backDate"
                    type="date"
                    value={backDate ?? ''}
                    onChange={changeBack}
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
            {state.value === 'error' && error}
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
