export default class EmberListener {

  listen(consumer) {
    // eslint-disable-next-line
    Ember.onerror = (error) => {
      const errorLog = {
        source: 'ember',
        timestamp: Date.now(),
        error
      }
      consumer.consumeError(errorLog)
    }
  }
}
