import validator from 'is-my-json-valid';
import cloneDeep from 'lodash/cloneDeep';
import { config } from '../config';

export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_DELETE = 'DELETE';
export const BODY_JSON = 'JSON';
export const BODY_FORM = 'FORM';

const addAdditionalProperties = (schema) => {
  if (schema.type === 'object') {
    return Object.assign({}, schema, {
      additionalProperties: false,
      properties: Object.entries(schema.properties).reduce((acc, [key, value]) => {
        if (value.type === 'object' || value.type === 'array') {
          acc[key] = addAdditionalProperties(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {}),
    });
  } else if (schema.type === 'array') {
    return Object.assign({}, schema, {
      items: Object.assign({}, schema.items, {
        additionalProperties: false,
      }),
    });
  }
  return schema;
};

export const fetchRetry = (url, options) => {
  const retries = 1;
  const delay = 0;
  return new Promise((resolve, reject) => {
    let count = 1;
    let opt = {};
    if(options.mode !== 'no-cors') {
      opt = options;
    }
    const attempt = () => fetch(url, opt)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        resolve(response);
      })
      .catch((error) => {
        if (count < retries) {
          count += 1;
          if (delay) {
            setTimeout(attempt, delay);
          } else {
            attempt();
          }
        } else {
          reject(error);
        }
      });
    attempt();
  });
};

export const fetchData = async ({
  serviceName,
  params,
  callback = () => {},
  schema = null,
  additionalSchemas = null,
  method = METHOD_POST,
  additionalHeaders = {},
  bodyType = BODY_JSON,
}) => {
  let urlPrefix = config.url;
  let headers = {
    'Accept': 'application/json',
  };
  const credentials = 'include';
  const mode = 'no-cors';
  Object.assign(headers, additionalHeaders);

  let body;
  if (bodyType === BODY_JSON) {
    body = typeof params === 'object' ? JSON.stringify(params) : params;
  } else {
    body = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])) // eslint-disable-line
      .join('&');
  }
  return fetchRetry(urlPrefix + serviceName, {
    method,
    mode,
    headers,
    credentials,
    body,
  })
    .then(response => response.json())
    .then((json) => {
      if (schema) {
        let validate;
        let successSchema = schema;
        let failedSchema = schema;

        if (Array.isArray(schema)) {
          successSchema = schema[0];
          failedSchema = schema[1];
        }

        if (json.success === false) {
          validate = validator(failedSchema);
        } else {
          validate = validator(successSchema);
        }

        if (validate(json)) {
          if (additionalSchemas) {
            const output = Object.entries(additionalSchemas).reduce((acc, [key, value]) => {
              const validateChild = validator(value);
              const jsonClone = cloneDeep(json);

              acc[key] = false;

              if (validateChild(jsonClone)) {
                const filter = validator.filter(addAdditionalProperties(value));
                acc[key] = filter(jsonClone);
              }

              return acc;
            }, {});

            callback(output);

            return output;
          }

          let schemaForFilter = addAdditionalProperties(successSchema);
          if (json.success === false) {
            schemaForFilter = addAdditionalProperties(failedSchema);
          }

          const filter = validator.filter(schemaForFilter);
          const filteredJSON = filter(json);

          callback(filteredJSON);

          return filteredJSON;
        }

        callback();

        return { success: false };
      }
      callback(json);
      return json;
    }).catch(() => {});
};

export const myFetch = (
  serviceName,
  params,
  callback,
) => fetchData({
  serviceName,
  params,
  callback,
});

export default {
  myFetch,
  fetchData,
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  METHOD_DELETE,
  BODY_JSON,
  BODY_FORM,
};
