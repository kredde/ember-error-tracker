# Ember Error Tracker
[![NPM](https://nodei.co/npm/ember-error-tracker.png?compact=true)](https://nodei.co/npm/ember-error-tracker/)


[![Build Status](https://flat.badgen.net/travis/kredde/ember-error-tracker)](https://travis-ci.org/kredde/ember-error-tracker)
![mantainability-badge](https://flat.badgen.net/codeclimate/maintainability/kredde/ember-error-tracker)
![license-badge](https://flat.badgen.net/npm/license/ember-error-tracker)


ember-error-tracker enables the handling and logging of uncaught errors. The error is logged along with a specified number of events that led to it and can be consumed either by the console or a custom api endpoint.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-log-errors
```


Getting started
------------------------------------------------------------------------------

Add the configuration to your `config/environment.js`.

Example:
```javascript
'ember-error-tracker': {
  maxLogStackSize: 10, // the number of events to track
  listeners: {
    ember: {
      rsvp: true,
      ember: true,
      actions: true,
    },
    window: true,
  },
  events: ['click', 'input', 'scroll'], // you can add any js events
  consumers: {
    console: true,
    api: { // set to false if you just want to use it locally
      endPoint: 'http://your.api/log'
      key: 'SUPERSECRETKEY'
    },
  }
}
```

Enable babel source-maps in your `ember-cli-build.js` if you want to find out the original position of the
error.

You might only want to enable this in production since it affects building time and can slow down your
hot reload times.

```javascript
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      sourceMaps: 'inline'
    },
  });
}

```

Source maps to find original error position
------------------------------------------------------------------------------
To get the original position of the error in the source code you can use
[mozilla/source-maps](https://github.com/mozilla/source-map). The location
of the source map in a production build can be found at the end of the minified
js file.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
