import { assert } from '@ember/debug';
import EventStack from 'ember-error-tracker/utils/EventStack'

export default class Consumer {

  constructor(maxLogStackSize, consumerOptions) {
    if (consumerOptions.api) {
      assert('Must pass an endpoint if api consumer is enabled', typeof consumerOptions.api.endPoint === 'string')
    }

    this.options = consumerOptions
    this.eventStack = new EventStack(maxLogStackSize)

    this.consumeError = this.consumeError.bind(this)
    this.consumeEvent = this.consumeEvent.bind(this)
  }

  // when an error is catched it is logged with the last events that led to it
  consumeError(error) {
    const payload = {
      error,
      events: this.eventStack.array
    }

    if (this.options.console) {
      // eslint-disable-next-line no-console
      console.error(error.error.stack, payload)
    }
    if (this.options.api) {
      // TODO
    }
  }

  // events are stored in a stack
  consumeEvent() {
    const eventObject = {
      type: event.type,
      location: window.location.pathname,
      nativeEvent: event,
      timestamp: Date.now()
    }
    this.eventStack.push(eventObject)
  }
}
