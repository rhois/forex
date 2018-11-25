/* eslint no-console: 0, class-methods-use-this: 0 */

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

class Loader {
  constructor(env) {
    this.isEnvAvailable = false;

    if (this.checkEnv()) {
      this.isEnvAvailable = true;
      this.setEnv();
    } else {
      switch (env) {
        case 'production':
          this.env = 'production';
          break;
        case 'staging':
          this.env = 'staging';
          break;
        default:
          this.env = 'development';
          break;
      }
      this.config = this.init();
    }
  }
  checkEnv() {
    try {
      fs.accessSync(`${__dirname}/../../.env`, fs.constants.R_OK);
      return true;
    } catch (e) {
      return false;
    }
  }
  setEnv() {
    const file = fs.readFileSync(`${__dirname}/../../.env`, 'utf8');
    let parsed = dotenv.parse(file);
    parsed = this.envParse(parsed);

    if (typeof parsed === 'object') {
      this.load(`export const config = ${JSON.stringify(parsed)};\n`, `${__dirname}/../config/index.js`);
    } else {
      console.log('Invalid .env file. Please check the configuration file.');
    }
  }
  envParse(parsed) {
    const result = {};
    Object.keys(parsed).forEach((k) => {
      try {
        result[k] = JSON.parse(parsed[k]);
      } catch (e) {
        result[k] = parsed[k];
      }
    });
    return result;
  }
  content() {
    const jsonConfig = JSON.stringify(this.config);
    return `export const config = ${jsonConfig};\n`;
  }
  configPath() {
    const configPath = `${__dirname}/../config/${this.env}/config.json`;
    return path.normalize(configPath);
  }
  load(configContent, configPath) {
    fs.writeFile(configPath, configContent, (err) => {
      if (err) {
        return 'Setup failed! Cannot write config file.';
      }
      return true;
    });
  }
  write() {
    this.load(this.content(), `${__dirname}/../config/index.js`);
  }
  init() {
    const configPath = this.configPath();
    try {
      fs.accessSync(configPath, fs.R_OK || fs.W_OK);
      const plainConfigContent = fs.readFileSync(configPath, 'utf8');
      this.config = JSON.parse(plainConfigContent);
      return this.config;
    } catch (e) {
      this.status = `Config file for "${this.env} not found.`;
      return this.status;
    }
  }
}

module.exports = Loader;
