const Sentry = require('@sentry/node');
const diagnostics = require('../../index');

jest.mock('@sentry/node');

describe('The Sentry builder', () => {
  let config;

  beforeEach(() => {
    config = {
      dns: 'https://soemthing/09876543210',
      debug: true,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('constructs a Sentry instance successfully, with valid parameters', () => {
    const sentryInstance = diagnostics.SentryBuilder.setWhitelistedEnvironments(
      ['test'],
    )
      .setConfiguration(config)
      .start();

    expect(Sentry.init).toHaveBeenCalledWith(config);
    expect(sentryInstance.SDK_NAME).toBe('sentry.javascript.node');
  });

  it('does not start Sentry if the no confiuration provided at all', () => {
    diagnostics.SentryBuilder.setWhitelistedEnvironments()
      .setConfiguration()
      .start();

    expect(Sentry.init).not.toHaveBeenCalled();
  });

  it('does not start Sentry if the desired environment is not specified', () => {
    diagnostics.SentryBuilder.setWhitelistedEnvironments([
      'qa',
      'narnia',
      'production',
    ])
      .setConfiguration(config)
      .start();

    expect(Sentry.init).not.toHaveBeenCalled();
  });

  it('throws an error if a non array passed to setWhitelistedEnvironments', () => {
    try {
      diagnostics.SentryBuilder.setWhitelistedEnvironments('qa, dev')
        .setConfiguration(config)
        .start();
    } catch (e) {
      expect(e.message).toBe(
        'The data provided to .setWhitelistedEnvironments() was not an Array.',
      );
    }
  });

  it('throws an error if a non object passed to setConfiguration', () => {
    try {
      diagnostics.SentryBuilder.setWhitelistedEnvironments()
        .setConfiguration([])
        .start();
    } catch (e) {
      expect(e.message).toBe(
        'The configuration provided to .setConfiguration() was not an Object.',
      );
    }
  });
});
