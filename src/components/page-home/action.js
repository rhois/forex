import { ActionTypes } from '../../store/action-types';
import { fetchData } from '../../helpers/fetch';
import { numberFormat } from '../../helpers/numberFormat';
import schemaLatest from './schemas/schema-latest.json';

export const url = {
  LATEST_FOREIGN: '/latest',
};

export const updateLatestByBase = currencies => ({
  type: ActionTypes.UPDATE_LATEST_BY_BASE,
  currencies,
  isLoaded: true,
});

export const fetchLatestSymbols = (base, initDefault, symbols) => dispatch => {
  let extra = '?base=' + base;
  if(symbols.length > 0) {
    extra = '?base=' + base + '&symbols=' + symbols.join();
  }
  return fetchData({
    method: 'GET',
    serviceName: url.LATEST_FOREIGN + extra,
    schema: schemaLatest,
    callback: (data) => {
      if (data) {
        const rates = Object.keys(data.rates).map((key) => {
          let title = '';
          const calculation = numberFormat((data.rates[key] * initDefault).toFixed(2));
          if(key === 'USD') {
            title = 'United States Dollar'
          } else if(key === 'CAD') {
            title = 'Canada Dollar';
          } else if(key === 'IDR') {
            title = 'Indonesian Rupiah';
          } else if(key === 'GBP') {
            title = 'British Pound';
          } else if(key === 'CHF') {
            title = 'Switzerland Franc';
          } else if(key === 'SGD') {
            title = 'Singapore Dollar';
          } else if(key === 'INR') {
            title = 'Indian Rupee';
          } else if(key === 'MYR') {
            title = 'Malaysian Ringgit';
          } else if(key === 'JPY') {
            title = 'Japanese Yen';
          } else if(key === 'KRW') {
            title = 'South Korean Won';
          } else if(key === 'EUR') {
            title = 'Euro';
          }
          return {
            rates: key,
            value: numberFormat((data.rates[key]).toFixed(2)),
            title,
            calculation,
          };
        });
        const sortArray = rates.sort(function(a, b) {
          return symbols.indexOf(a.rates) - symbols.indexOf(b.rates);
        });
        dispatch(updateLatestByBase(sortArray));
      }
    },
  });
};

export const resetData = () => ({
  type: ActionTypes.LATEST_FOREIGN_RESET,
  isLoaded: false,
});

export default {
  fetchLatestSymbols,
  resetData,
};
