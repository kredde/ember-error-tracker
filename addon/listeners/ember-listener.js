export default class EmberListener {

  listen(consumer) {
    // consume RSVP errors
    // eslint-disable-next-line
    Ember.RSVP.onerror = function (error) {
      const errorLog = {
        source: 'ember',
        timestamp: Date.now(),
        error
      };
      consumer.consumeError(errorLog);
    };

    // consume ember errors
    // eslint-disable-next-line
    Ember.onerror = (error) => {
      const errorLog = {
        source: 'ember',
        timestamp: Date.now(),
        error
      };
      consumer.consumeError(errorLog);
    }
  }
}
