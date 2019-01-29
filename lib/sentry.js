/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const sentry = require('@sentry/node');

let configuration;
let whitelistedEnvironments;
let started = false;

const sentryBuilder = {
  /**
   * @name setConfiguration
   * @description A setter for the Sentry configuration object.
   *
   * @param {Object} incomingConfiguration A Sentry configuration object.
   *
   * @returns {Object<sentryBuilder>}
   */
  setConfiguration: (incomingConfiguration = {}) => {
    if (!(incomingConfiguration instanceof Object)) {
      throw new TypeError(
        'The configuration provided to .setConfiguration() was not an Object.',
      );
    }

    configuration = incomingConfiguration;

    return sentryBuilder;
  },

  /**
   * @name setWhitelistedEnvironments
   * @description A setter for the allowed environments Sentry
   * is allowed to run on.
   *
   * @param {Array} incomingWhitelistedEnvironments An array of allowed environment names.
   *
   * @returns {Object<sentryBuilder>}
   */
  setWhitelistedEnvironments: (incomingWhitelistedEnvironments = []) => {
    if (!Array.isArray(incomingWhitelistedEnvironments)) {
      throw new TypeError(
        'The data provided to .setWhitelistedEnvironments() was not an Array.',
      );
    }

    whitelistedEnvironments = incomingWhitelistedEnvironments;

    return sentryBuilder;
  },

  /**
   * @name start
   * @description Attempts to start and return an instance of Sentry, providing
   * that all the conditions are correct.
   *
   * @returns {(Object<Sentry>|false)}
   */
  start: () => {
    if (started && process.env.NODE_ENV !== 'test') {
      throw new Error(
        'You have already started Sentry. It does not need to be started again.',
      );
    }

    if (!whitelistedEnvironments.includes(process.env.NODE_ENV)) {
      return false;
    }

    sentry.init(configuration);
    started = true;

    return sentry;
  },
};

/**
 * Export.
 */
module.exports = sentryBuilder;
