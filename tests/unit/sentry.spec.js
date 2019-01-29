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
const diagnostics = require('../../index');

jest.mock('@sentry/node');

describe('The Sentry builder', () => {
  let config;

  beforeEach(() => {
    config = {
      dsn: 'https://something/09876543210',
      debug: true,
    };
  });

  afterEach(() => {
    sentry.init.mockClear();
  });

  it('constructs a Sentry instance successfully, with valid parameters', () => {
    const sentryInstance = diagnostics.sentryBuilder
      .setWhitelistedEnvironments(['test'])
      .setConfiguration(config)
      .start();

    expect(sentry.init).toHaveBeenCalledWith(config);
    expect(sentryInstance.SDK_NAME).toBe('sentry.javascript.node');
  });

  it('does not start Sentry if the no confiuration provided at all', () => {
    diagnostics.sentryBuilder
      .setWhitelistedEnvironments()
      .setConfiguration()
      .start();

    expect(sentry.init).not.toHaveBeenCalled();
  });

  it('does not start Sentry if the desired environment is not specified', () => {
    diagnostics.sentryBuilder
      .setWhitelistedEnvironments(['qa', 'narnia', 'production'])
      .setConfiguration(config)
      .start();

    expect(sentry.init).not.toHaveBeenCalled();
  });

  it('throws an error if a non array passed to setWhitelistedEnvironments', () => {
    try {
      diagnostics.sentryBuilder
        .setWhitelistedEnvironments('qa, dev')
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
      diagnostics.sentryBuilder
        .setWhitelistedEnvironments()
        .setConfiguration([])
        .start();
    } catch (e) {
      expect(e.message).toBe(
        'The configuration provided to .setConfiguration() was not an Object.',
      );
    }
  });
});
