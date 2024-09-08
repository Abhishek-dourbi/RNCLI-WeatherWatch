import { useCallback, useReducer } from 'react';

type Action<T> = {
  type: 'update';
  payload: T;
};

type ReducerState<T> = T;

const reducer = <T>(state: ReducerState<T>, action: Action<T>): ReducerState<T> => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    default:
      throw new Error('Unsupported action type');
  }
};

function useSimpleReducer<T>(initialState: T): [ReducerState<T>, (payload: Partial<T>) => void] {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateState = useCallback(
    (payload: Partial<T>) =>
      dispatch({
        type: 'update',
        payload,
      }),
    [],
  );

  return [state as T, updateState];
}

export { useSimpleReducer };
