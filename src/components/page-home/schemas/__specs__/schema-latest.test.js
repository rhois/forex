/* global expect */

import validator from 'is-my-json-valid';
import { url } from '../../action';
import { config } from '../../../../config';
import schema from '../schema-latest.json';

const currenciesUrl = `${config.url}${url.LATEST_FOREIGN}`;

describe('./page-home/schemas', () => {
  describe(`POST ${currenciesUrl}`, () => {
    it('return valid JSON for get data currencies', (done) => {
      fetch(currenciesUrl)
        .then(response => response.json())
        .then((json) => {
          const validate = validator(schema);
          expect(validate(json)).toEqual(true);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });
});
