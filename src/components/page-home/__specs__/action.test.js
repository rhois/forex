/* global expect */
import {
    updateLatestByBase,
} from '../action';
import { ActionTypes } from '../../../store/action-types';
  
describe('./page-home/action', () => {
    describe('#actions', () => {
      it('prepare array currencies with the provided data', () => {
        const expectedResult = {
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
        };
  
        const data = [
          {
            rates: 'IDR',
            value: '14,531.19',
            title: ' Indonesian Rupiah',
            calculation: '145,311.93',
          },
        ];
        const result = updateLatestByBase(data);
        expect(result).toEqual(expectedResult);
      });
    });
});
