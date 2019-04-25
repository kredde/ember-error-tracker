import { assert } from '@ember/debug';
import fetch from 'fetch'
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
    const screen = {};
    if (window && window.screen) {
      screen['resolution'] = {
        width: window.screen.width,
        height: window.screen.height
      };
    }
    if (window && window.innerHeight && window.innerWidth) {
      screen['viewPort'] = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    const location = window && window.location ? window.location.pathname : undefined

    const payload = {
      error,
      userAgent: window && window.navigator ? navigator.userAgent : undefined,
      screen,
      location,
      events: this.eventStack.array
    };

    if (this.options.console) {
      // eslint-disable-next-line no-console
      console.error(error.error.stack, payload.error);
    }
    if (this.options.api && this.options.api.endPoint) {
      const key = this.options.api.key ? `?key=${this.options.api.key}` : '';
      const url = `${this.options.api.endPoint}${key}`;
      const body = JSON.stringify(payload, replaceErrors);
      const options = { headers: { Accept: 'application/json', 'Content-type': 'application/json' }, method: 'post', body };

      // catch error to prevent infinite error loop in case there is an issue with the api
      fetch(url, options).catch(() => { });
    }
  }
  /**
   * pushes events into stack
   *
   * @method consumeEvent
   */
  consumeEvent(event) {
    let target = {}
    if (event.target) {
      const tagName = event.target.tagName ? event.target.tagName.toLowerCase() : undefined;
      if (tagName) {
        const classList = Array.from(event.target.classList);
        const classString = classList.reduce((string, className) => `${string}.${className}`, '');
        const id = event.target.id;
        // create selector of type `tagname#id.class1.class2`
        target['selector'] = `${tagName}${id ? `#${id}` : ''}${classString}`;
        target['text'] = event.target.innerText
      }
    }

    const eventObject = {
      type: event.type,
      location: window ? window.location.pathname : undefined,
      target,
      timestamp: Date.now()
    };

    this.eventStack.push(eventObject);
  }
}
