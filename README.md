ember-log-errors
==============================================================================

[Short description of the addon.]


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

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
