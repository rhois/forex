import { ActionTypes } from '../../store/action-types';

const initialState = {
  rates: {},
  isLoaded: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LATEST_FOREIGN: {
      console.log('masuk sini');
      return Object.assign({}, state, {
        rates: action.rates,
        isLoaded: action.isLoaded,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;

