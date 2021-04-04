import { useCallback, Reducer, useReducer } from 'react';
import { createContainer } from 'unstated-next';

import { restoreStorage, storeStorage, getNewCondition } from '@common/plugin';

type State = {
  storage: PluginStorage;
};

type Action =
  | {
      type: 'save';
    }
  | {
      type: 'update';
      index: number;
      condition: PluginCondition;
    }
  | {
      type: 'addCondition';
    }
  | {
      type: 'removeCondition';
      index: number;
    };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'save': {
      storeStorage(state.storage, () => true);
      console.log(state.storage);
      return state;
    }
    case 'update': {
      const newConditions = [...state.storage.conditions];
      newConditions[action.index] = action.condition;

      return { ...state, storage: { ...state.storage, conditions: newConditions } };
    }
    case 'addCondition': {
      return { ...state, storage: { ...state.storage, conditions: [...state.storage.conditions, getNewCondition()] } };
    }
    case 'removeCondition': {
      const newCondition = [...state.storage.conditions];
      newCondition.splice(action.index, 1);
      return { ...state, storage: { ...state.storage, conditions: newCondition } };
    }
  }
};

/**
 *
 * @param initialState
 * @returns 使用するReactのフック
 */
const hooks = (initialState: string = '') => {
  const [{ storage }, dispatch] = useReducer(reducer, { storage: restoreStorage(initialState) });

  const save = useCallback(() => dispatch({ type: 'save' }), []);
  const update = useCallback(
    (index: number, condition: PluginCondition) => dispatch({ type: 'update', index, condition }),
    []
  );
  const addCondition = useCallback(() => dispatch({ type: 'addCondition' }), []);
  const removeCondition = useCallback((index: number) => dispatch({ type: 'removeCondition', index }), []);

  return { storage, save, update, addCondition, removeCondition };
};

export default createContainer(hooks);
