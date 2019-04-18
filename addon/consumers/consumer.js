import { assert } from '@ember/debug';
import { fetch } from 'fetch'
import EventStack from 'ember-error-tracker/utils/EventStack'
import replaceErrors from 'ember-error-tracker/utils/stringify-error'

/**
 *
 * @class Consumer
 */
export default class Consumer {

  /**
   * initialize consumer objet
   *
   * @param {Number} maxLogStackSize
   * @param {Object} consumerOptions
   */
  constructor(maxLogStackSize, consumerOptions) {
    if (consumerOptions.api) {
      assert(
        'Must pass an endpoint if api consumer is enabled',
        consumerOptions.api.endPoint && typeof consumerOptions.api.endPoint === 'string'
      );
    }
    this.options = consumerOptions;
    this.eventStack = new EventStack(maxLogStackSize);

    this.consumeError = this.consumeError.bind(this);
    this.consumeEvent = this.consumeEvent.bind(this);
  }
  /**
   * log error to console and/or api endpoint along with the events that led to it
   *
   * @method consumeError
   * @param {Error} error
   */
  consumeError(error) {
    const payload = {
      error,
      events: this.eventStack.array
    };

    if (this.options.console) {
      // eslint-disable-next-line no-console
      console.error(error.error.stack, payload);
    }
    if (this.options.api) {
      const key = this.options.api.key ? `?key=${this.options.api.key}` : '';
      const url = `${this.options.api.endPoint}${key}`;
      const body = JSON.stringify(payload, replaceErrors);
      const options = { headers: { Accept: 'application/json', 'Content-type': 'application/json' }, method: 'post', body };

      // catch error to prevent infinite error loop in case there is an issue with the api
      fetch(url, options).catch();
    }
  }
  /**
   * pushes events into stack
   *
   * @method consumeEvent
   */
  consumeEvent() {
    const eventObject = {
      type: event.type,
      location: window.location.pathname,
      nativeEvent: event,
      timestamp: Date.now()
    };
    this.eventStack.push(eventObject);
  }
}
