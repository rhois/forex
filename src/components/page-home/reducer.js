import { ActionTypes } from '../../store/action-types';

const initialState = {
  currencies: [],
  isLoaded: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LATEST_BY_BASE: {
      return Object.assign({}, state, {
        currencies: action.currencies,
        isLoaded: action.isLoaded,
      });
    }
    case ActionTypes.LATEST_FOREIGN_RESET:
      return initialState;
    default: {
      return state;
    }
  }
};

export default reducer;

