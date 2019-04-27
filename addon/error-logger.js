import EmberObject from '@ember/object'

import WindowListener from './listeners/window-listener'
import EmberListener from './listeners/ember-listener'
import EventListener from './listeners/event-listener'
import Consumer from './consumers/consumer'


const DEFAULT_OPTIONS = {
  maxLogStackSize: 10,
  listeners: {
    ember: {
      rsvp: true,
      ember: true,
      actions: true,
    },
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

  constructor(customOptions = {}, environment) {
    super(...arguments)

    const options = Object.assign(DEFAULT_OPTIONS, customOptions);
    this.options = options;
    this.environment = environment
  }

  /**
   * creates a consumer and the event and error listeners
   *
   * @method listen
   */
  listen() {
    const consumer = new Consumer(this.options.maxLogStackSize, this.options.consumers);
    const emberListener = new EmberListener();
    emberListener.listen(consumer, this.options.listeners.ember, this.environment);

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



