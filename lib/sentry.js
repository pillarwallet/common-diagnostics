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
