import { ActionTypes } from '../../store/action-types';
import { fetchData } from '../../helpers/fetch';
import schemaLatest from './schemas/schema-latest.json';

export const url = {
  LATEST_FOREIGN: '/latest',
};

export const updateLatestForeign = data => ({
  type: ActionTypes.UPDATE_LATEST_FOREIGN,
  rates: data,
  isLoaded: true,
});

export const fetchLatest = () => dispatch => fetchData({
  method: 'GET',
  serviceName: url.LATEST_FOREIGN,
  schema: schemaLatest,
  callback: (data) => {
    if (data) {
      console.log('masuk');
      console.log(data);
      dispatch(updateLatestForeign(data.rates));
    }
  },
});

// export const fetchLatest = () => dispatch => {
//   return fetch(config.url + url.LATEST_FOREIGN, {})
//   .then(response => {
//     console.log(response);
//   })
//   .then((data) => {
//     if (data) {
//       console.log(data);
//       dispatch(updateLatestForeign(data.rates));
//     }
//   }) // parses response to JSON
// };

export default {
  fetchLatest,
};
