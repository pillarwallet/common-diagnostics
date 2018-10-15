# common-diagnostics
Common Diagnostics is a set of tools that assist in the monitoring, health and
reporting of issues from server to code level.

## Currently available services
- [Sentry](https://sentry.io)

## Updating this README.md
Run `npm run generateReadme` to parse the code for JSDoc comment blocks and recreate this README.md file.

## Install
Run `npm i @pillarwallet/common-diagnostics`

## Getting Started
### Sentry
In order to use Sentry, you must first instruct Sentry on what environments it is allowed
to be instantiated on. Sentry will not start automatically, you must "opt-in" to use it -
this prevents Sentry running and reporting on environments that do not require monitoring such
as development, test and local environments.

First, include the library:
```javascript
const diagnostics = require('@pillarwallet/diagnostics');
```

Next, build your Sentry configuration:
```javascript

/**
 * Build an array of environment names that Sentry is ALLOWED to
 * run on. Any other environments will not trigger an instantiation
 * of Sentry.
 */
const whitelistedEnvironments = ['qa', 'narnia', 'production'];

/**
 * Pass through a Sentry configuration object, specific to the app
 * that this instance of Sentry is running on. The Sentry configuration
 * object can be found here:
 * https://docs.sentry.io/learn/configuration/?platform=node
 */
const sentryConfiguration = {
  dsn: 'https://1qaz2wsx3edc4rfv@sentry.io/1234567',
  debug: true,
};

/**
 * Call the required methods to build and start an instance of
 * Sentry. Once start is successfully called, an instance of Sentry
 * is return to the app.
 */
const sentry = diagnostics.sentryBuilder.setWhitelistedEnvironments(
      whitelistedEnvironments,
    )
      .setConfiguration(sentryConfiguration)
      .start();
```

Further information on how to implement Sentry with Express, and other Javascript
based libraries and frameworks is located [here](https://docs.sentry.io/platforms/javascript/express).

# API

## Members

<dl>
<dt><a href="#setConfiguration">setConfiguration</a> ⇒ <code>Object.&lt;sentryBuilder&gt;</code></dt>
<dd><p>A setter for the Sentry configuration object.</p>
</dd>
<dt><a href="#setWhitelistedEnvironments">setWhitelistedEnvironments</a> ⇒ <code>Object.&lt;sentryBuilder&gt;</code></dt>
<dd><p>A setter for the allowed environments Sentry
is allowed to run on.</p>
</dd>
<dt><a href="#start">start</a> ⇒ <code>Object.&lt;Sentry&gt;</code> | <code>false</code></dt>
<dd><p>Attempts to start and return an instance of Sentry, providing
that all the conditions are correct.</p>
</dd>
</dl>

<a name="setConfiguration"></a>

## setConfiguration ⇒ <code>Object.&lt;sentryBuilder&gt;</code>
A setter for the Sentry configuration object.

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| incomingConfiguration | <code>Object</code> | A Sentry configuration object. |

<a name="setWhitelistedEnvironments"></a>

## setWhitelistedEnvironments ⇒ <code>Object.&lt;sentryBuilder&gt;</code>
A setter for the allowed environments Sentry
is allowed to run on.

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| incomingWhitelistedEnvironments | <code>Array</code> | An array of allowed environment names. |

<a name="start"></a>

## start ⇒ <code>Object.&lt;Sentry&gt;</code> \| <code>false</code>
Attempts to start and return an instance of Sentry, providing
that all the conditions are correct.

**Kind**: global variable  

