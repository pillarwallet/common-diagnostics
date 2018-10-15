const Sentry = require('@sentry/node');

const SentryBuilder = {
  /**
   * @name setConfiguration
   * @description A setter for the Sentry configuration object.
   *
   * @param {Object} - A Sentry configuration object.
   *
   * @returns {Object<SentryBuilder>}
   */
  setConfiguration: (incomingConfiguration = {}) => {
    if (!(incomingConfiguration instanceof Object)) {
      throw new TypeError(
        'The configuration provided to .setConfiguration() was not an Object.',
      );
    }

    this.configuration = incomingConfiguration;

    return SentryBuilder;
  },

  /**
   * @name setWhitelistedEnvironments
   * @description A setter for the allowed environments Sentry
   * is allowed to run on.
   *
   * @param {Array} - An array of allowed environment names.
   *
   * @returns {Object<SentryBuilder>}
   */
  setWhitelistedEnvironments: (whitelistedEnvironments = []) => {
    if (!Array.isArray(whitelistedEnvironments)) {
      throw new TypeError(
        'The data provided to .setWhitelistedEnvironments() was not an Array.',
      );
    }

    this.whitelistedEnvironments = whitelistedEnvironments;

    return SentryBuilder;
  },

  /**
   * @name start
   * @description Attempts to start and return an instance of Sentry, providing
   * that all the conditions are correct.
   *
   * @returns {Object<Sentry>}
   */
  start: () => {
    if (this.started && process.env.NODE_ENV !== 'test') {
      throw new Error(
        'You have already started Sentry. It does not need to be started again.',
      );
    }

    if (!this.whitelistedEnvironments.includes(process.env.NODE_ENV)) {
      return false;
    }

    Sentry.init(this.configuration);
    this.started = true;

    return Sentry;
  },
};

/**
 * Export.
 */
module.exports = SentryBuilder;
