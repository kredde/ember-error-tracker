import EmberObject from '@ember/object';

/**
 * Listens to error events triggered by ember
 *
 * @class EmberListeners
 */
export default class EmberListener extends EmberObject {
  /**
   * initializes ember error listeners
   *
   * @method listen
   * @param consumer
   * @param options
   */
  listen(consumer, options) {
    // consume RSVP errors
    if (options.rsvp) {
      // eslint-disable-next-line
      Ember.RSVP.onerror = function (error) {
        const errorLog = {
          source: 'ember-rsvp',
          timestamp: Date.now(),
          error
        };
        consumer.consumeError(errorLog);
      };
    }


    // consume ember errors
    if (options.ember) {
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

    // consume action errors
    if (options.actions) {
      // eslint-disable-next-line
      Ember.ActionHandler.reopen({
        send: function (actionName) {
          try {
            this._super.apply(this, arguments);
          } catch (error) {
            const errorLog = {
              source: `ember-action:${actionName}`,
              timestamp: Date.now(),
              error
            };
            consumer.consumeError(errorLog);
          }
        }
      });
    }
  }
}
