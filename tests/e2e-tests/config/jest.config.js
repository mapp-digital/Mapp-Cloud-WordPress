const {jestConfig} = require('puppeteer-utils');

jestConfig.roots = [];
const modifiedConfig = jestConfig;
const afterEnvSetup = modifiedConfig.setupFilesAfterEnv;

afterEnvSetup.push( '<rootDir>/tests/e2e-tests/config/jest.setup.js');
modifiedConfig.setupFilesAfterEnv = afterEnvSetup;
modifiedConfig.testSequencer = '<rootDir>/tests/e2e-tests/config/jest-custom-sequencer.js';

module.exports = modifiedConfig;
