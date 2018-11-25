/* eslint no-console: 0, class-methods-use-this: 0 */

const Loader = require('./utils/configGenerator');
const config = require('dotenv').config(); // eslint-disable-line

const env = process.env.mode || 'development';
const setup = new Loader(env);

if (!setup.isEnvAvailable) {
  setup.write();
}

// LOG
console.log('=====================================');
console.log(`Running on ${env} environtment`);
console.log('=====================================');
