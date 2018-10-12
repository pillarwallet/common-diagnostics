const Sentry = require('@sentry/node');

const SentryBuilder = {
  /**
   * @name setConfiguration
   * @description a setter for the Sentry configuration object.
   *
   * @param {Object}
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
  setWhitelistedEnvironments: (whitelistedEnvironments = []) => {
    if (!Array.isArray(whitelistedEnvironments)) {
      throw new TypeError(
        'The data provided to .setWhitelistedEnvironments() was not an Array.',
      );
    }

    this.whitelistedEnvironments = whitelistedEnvironments;

    return SentryBuilder;
  },
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

module.exports = SentryBuilder;
