/* global expect */

import { reducer } from '../reducer';
import { ActionTypes } from '../../../store/action-types';

describe('./page-home/reducer', () => {
  it('return the correct default state', () => {
    const state = reducer(undefined, {});
    const expectedResult = {
      isLoaded: false,
      currencies: [],
    };

    expect(state).toEqual(expectedResult);
  });
  it('List of Currenies', () => {
    const state = reducer(undefined, {
      type: ActionTypes.UPDATE_LATEST_BY_BASE,
      currencies: [
        {
          rates: 'IDR',
          value: '14,531.19',
          title: ' Indonesian Rupiah',
          calculation: '145,311.93',
        },
      ],
      isLoaded: true,
    });

    const expectedResult = [
      {
        rates: 'IDR',
        value: '14,531.19',
        title: ' Indonesian Rupiah',
        calculation: '145,311.93',
      },
    ];

    expect(state.currencies).toEqual(expectedResult);
    expect(state.isLoaded).toEqual(true);
  });

  it('Reset list of currencies to default state', () => {
    const expectedResult = {
      isLoaded: false,
      currencies: [],
    };
    const existingState = {
      currencies: [
        {
          rates: 'IDR',
          value: '14,531.19',
          title: ' Indonesian Rupiah',
          calculation: '145,311.93',
        },
      ],
      isLoaded: true,
    };

    const state = reducer(existingState, {
      type: ActionTypes.LATEST_FOREIGN_RESET,
    });

    expect(state).toEqual(expectedResult);
  });
});
