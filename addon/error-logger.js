import EmberObject from '@ember/object'

import WindowListener from './listeners/window-listener'
import EmberListener from './listeners/ember-listener'
import EventListener from './listeners/event-listener'
import Consumer from './consumers/consumer'


const defaultOptions = {
  maxLogStackSize: 10,
  listeners: {
    ember: true,
    window: true,
  },
  events: ['click', 'input', 'scroll'],
  consumers: {
    console: true,
    api: false,
  }
}
/**
 * Initializes error tracker
 *
 * @class ErrorLogger
 */
export default class ErrorLogger extends EmberObject {

  constructor(customOptions = {}) {
    super(...arguments)

    const options = Object.assign(defaultOptions, customOptions);
    this.options = options;
  }

  listen() {
    const consumer = new Consumer(this.options.maxLogStackSize, this.options.consumers);

    if (this.options.listeners.ember) {
      const emberListener = new EmberListener();
      emberListener.listen(consumer);
    }

    if (window && this.options.listeners.window) {
      const windowListener = new WindowListener();
      windowListener.listen(consumer);
    }

    if (this.options.events) {
      const eventListener = new EventListener();
      this.options.events.forEach(event => {
        eventListener.listen(event, consumer);
      });
    }
  }
}



